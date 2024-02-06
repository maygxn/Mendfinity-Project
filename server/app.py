from config import app
from flask import jsonify, request, make_response, session
from werkzeug.security import check_password_hash, generate_password_hash
from models import db, Patient, Exercise, FavoriteExercise, HealthJournalEntry


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        print(data)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

        existing_patient = Patient.query.filter_by(username=username).first()
        if existing_patient:
            return jsonify({"error": "User already exists"}), 400

        new_patient = Patient(username=username)
        new_patient.set_password(password)  # This should correctly hash the password

        db.session.add(new_patient)
        db.session.commit()

        return jsonify({"message": "Registered successfully"}), 200

    except Exception as e:
        # Improved logging for debugging
        print("Registration error:", str(e))
        return jsonify({"error": "An error occurred during registration"}), 500  # Use 500 to indicate server error




@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    patient = Patient.query.filter_by(username=username).first()

    if not patient or not patient.check_password(password):
        return {"error": "Invalid username or password"}, 401

    session['patient_id'] = patient.id  # Store the patient's ID in the session

    return {"message": "Logged in successfully", "patient_id": patient.id}, 200


@app.route('/logout', methods=['POST'])
def logout():
    session.clear()  # Clears all items in the session
    return jsonify({"message": "Logged out successfully"}), 200


# list all patients
@app.route("/patients", methods=['GET', 'POST'])
def patients():
    if request.method == "GET":

        patients = Patient.query.all()

        patients_dict = [patient.to_dict(rules = ("-favorite_exercises", "-exercise", "-health_journal_entries")) for patient in patients]

        response = make_response(
            patients_dict,
            200
        )
    elif request.method == "POST":
        form_data = request.get_json()

        new_patient = Patient(username=form_data["username"], password=form_data["password"])

        db.session.add(new_patient)
        db.session.commit()

        response = make_response(
            new_patient.to_dict(),
            201
        )
    return response


# get single patient by ID
@app.route("/patients/<int:id>", methods=['GET'])
def patients_by_id(id):
    patient = Patient.query.filter(Patient.id == id).first()

    response = make_response(
        patient.to_dict(),
        200
    )
    return response

# list all exercises
@app.route("/exercises", methods=['GET', 'POST'])
def exercises():

    if request.method == "GET":

        exercises = Exercise.query.all()

        exercises_dict = [exercise.to_dict(rules = ("-patient", "-favorite_exercises", "-health_journal_entries" )) for exercise in exercises]

        response = make_response(
            exercises_dict,
            200
        )

    elif request.method == "POST":

        form_data = request.get_json()

        new_exercise = Exercise(
            name = form_data['name'],
            description = form_data['description'],
            image_url = form_data['image_url']
        )

        db.session.add(new_exercise)
        db.session.commit()

        response = make_response(
            new_exercise.to_dict(),
            201
        )
    else:
        response = make_response(
            {"error": "invalid method"},
            400
        )

    return response

@app.route("/exercises/<int:id>", methods=["GET", "PATCH", "DELETE"])
def exercises_by_id(id):

    exercise = Exercise.query.filter(Exercise.id == id).first()

    if exercise:

        if request.method == "GET":

            response = make_response(
                exercise.to_dict(),
                200
            )

        elif request.method == "PATCH":

            form_data = request.get_json()

            for key in form_data:
                setattr(exercise, key, form_data[key])

            db.session.commit()

            response = make_response(
                exercise.to_dict(),
                200
            )

        elif request.method == "DELETE":

            db.session.delete(exercise)
            db.session.commit()

            response = make_response(
                {},
                204
            )

    else:

        response = make_response(
            {"error" : "invalid ID"},
            404
        )

    return response



# manage favorite exercises
@app.route("/favorite-exercises", methods=['GET', 'POST'])
def favorite_exercises():
    if request.method == 'GET':
        favorites = FavoriteExercise.query.all()

        favorites_dict = [favorite.to_dict() for favorite in favorites]

        response = make_response(
            favorites_dict,
            200
        )
    elif request.method == 'POST':

        form_data = request.get_json()

        new_favorite = FavoriteExercise(
            patient_id = form_data['patient_id'],
            exercise_id = form_data['exercise_id']
        )
        db.session.add(new_favorite)
        db.session.commit()

        response = make_response(
            new_favorite.to_dict(),
            201
        )
    else:
        response = make_response(
            {"error" : "invalid method"},
            400
        )

        return response

# get all favorite exercises for specific patient
@app.route("/patients/<int:patient_id>/favorite-exercises", methods=['GET'])
def patient_favorite_exercises(patient_id):
    favorites = FavoriteExercise.query.filter_by(patient_id=patient_id).all()

    favorites_dict = [favorite.to_dict(rules = ("-health_journal_entries", "-patient",)) for favorite in favorites]

    response = make_response(
        favorites_dict,
        200
    )
    return response

# CRUD for health journal entry for patient
@app.route('/health-journal-entries', methods=['GET', 'POST'])
def health_journal_entries():
    # Retrieve patient_id from the session
    patient_id = session.get('patient_id')
    if not patient_id:
        return jsonify({"error": f'User {patient_id} not logged in for session {str(session)}'}), 401

    if request.method == 'GET':
        # Use the patient_id from the session to filter journal entries
        entries = HealthJournalEntry.query.filter_by(patient_id=patient_id).all()
        entries_dict = [entry.to_dict() for entry in entries]
        return jsonify(entries_dict), 200

    elif request.method == 'POST':
        # No need to get patient_id from form_data, as it's already in the session
        form_data = request.get_json()
        new_entry = HealthJournalEntry(
            patient_id=patient_id,
            content=form_data.get('content'),
            entry_date=form_data.get('entry_date')
        )
        db.session.add(new_entry)
        db.session.commit()
        return jsonify(new_entry.to_dict()), 201

    # Fallback for unsupported methods
    return jsonify({"error": "Method not supported"}), 405


@app.route('/health-journal-entries/<int:entry_id>', methods=['PATCH', 'DELETE'])
def health_journal_entry_by_id(entry_id):
    entry = HealthJournalEntry.query.get(entry_id)

    if not entry:
        response = make_response(
            jsonify({"error": "Health journal entry not found"}),
            404
        )
    elif request.method == 'PATCH':
        form_data = request.get_json()

        for key, value in form_data.items():
            if hasattr(entry, key):
                setattr(entry, key, value)

        db.session.commit()

        response = make_response(
            entry.to_dict(),
            200
        )
    elif request.method == 'DELETE':
        db.session.delete(entry)
        db.session.commit()

        response = make_response(
        {"message": "Entry deleted successfully"},
            204
        )

    return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)
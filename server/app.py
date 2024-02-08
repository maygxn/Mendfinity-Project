from config import app
from datetime import datetime
from flask import jsonify, request, make_response, session
from werkzeug.security import check_password_hash, generate_password_hash
from models import db, Patient, Exercise, FavoriteExercise, HealthJournalEntry
# create the hashing stuff for us 
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager, decode_token

# token.js import getToken() 
# 

jwt = JWTManager(app)

def get_user_id(request):
    ''' 
    get the actual user_id to query database

    1. get headers
    2. get the authorization value (a.k.a token) (without the 'Bearer ' string)
    3. decode the token (which returns a dictionary)
    4. get the specific value from dictionary 'sub' (short for subject)
    5. then you have your id
    '''
    headers = request.headers 
    access_token = headers.get('Authorization')

    #unhash access_token
    token = access_token.split(' ')[1]
    patient_id = decode_token(token)["sub"]
    return patient_id

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        print(data)
        username = data.get('username')
        password = data.get('password')

        existing_patient = Patient.query.filter_by(username=username).first()
        if existing_patient:
            return jsonify({"error": "User already exists"}), 400

        #try/except
        new_patient = Patient(username=username)
        new_patient.set_password(password)  # This should correctly hash the password
        db.session.add(new_patient)
        db.session.commit()

        #hashing here via flask_jwt_extended 
        access_token = create_access_token(identity=new_patient.id)
        response = {"access_token":access_token}
        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400


        return jsonify(response), 200

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

    # not using sessions on backend anymore
    # using localStorage's jwt tokens on frontend 
    # session['patient_id'] = patient.id  # Store the patient's ID in the session

    access_token = create_access_token(identity=patient.id)
    response = {"access_token":access_token}

    return jsonify(response), 200


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
'''
@jwt_required necessary for flask-jwt-extended. it will check for the header as follows:
Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
'BEARER' IS DEFAULT DO NOT  CHANGE


'''
@app.route('/health-journal-entries', methods=['GET', 'POST'])
@jwt_required()
def health_journal_entries():
    current_user_id = get_jwt_identity()
    if not current_user_id:
        return jsonify({"error": f'User {current_user_id} not logged in for front end sessionStorage'}), 401

    if request.method == 'GET':
        entries = HealthJournalEntry.query.filter_by(patient_id=current_user_id).all()
        entries_dict = [entry.to_dict() for entry in entries]
        return jsonify(entries_dict), 200

    elif request.method == 'POST':
        form_data = request.get_json()
        new_entry = HealthJournalEntry(
            patient_id=current_user_id,
            content=form_data.get('content'),
            entry_date = datetime.strptime(form_data['entry_date'], '%Y-%m-%d').date()
        )
        db.session.add(new_entry)
        db.session.commit()
        return jsonify(new_entry.to_dict()), 201

    return jsonify({"error": "Method not supported"}), 405


@app.route('/health-journal-entries/<int:entry_id>', methods=['PATCH', 'DELETE'])
@jwt_required()
def health_journal_entry_by_id(entry_id):
    current_user_id = get_jwt_identity()
    entry = HealthJournalEntry.query.get(entry_id)

    if not entry:
        return jsonify({"error": "Health journal entry not found"}), 404

    elif request.method == 'PATCH':
        form_data = request.get_json()

        if 'entry_date' in form_data:
            try:
                entry_date = datetime.strptime(form_data['entry_date'], '%Y-%m-%d').date()
                form_data['entry_date'] = entry_date
            except ValueError as e:
                return jsonify({"error": "Invalid date format"}), 400

        for key, value in form_data.items():
            if hasattr(entry, key):
                setattr(entry, key, value)

        db.session.commit()
        return jsonify(entry.to_dict()), 200

    elif request.method == 'DELETE':
        db.session.delete(entry)
        db.session.commit()
        return jsonify({"message": "Entry deleted successfully"}), 204


if __name__ == '__main__':
    app.run(port=5555, debug=True)
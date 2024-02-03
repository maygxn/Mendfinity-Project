from config import app
from flask import jsonify, request, make_response
from models import db, Patient, Exercise, FavoriteExercise, HealthJournalEntry

# list all patients
@app.route("/patients", methods=['GET'])
def patients():
    patients = Patient.query.all()

    patients_dict = [patient.to_dict(rules = ("-favorite_exercises", "-exercise", "-health_journal_entries")) for patient in patients]

    response = make_response(
        patients_dict,
        200
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

@app.route("/patients/<int:patient_id>/health-journal-entries", methods=['GET', 'POST'])
def health_journal_entries(patient_id):
    # list all health journal entries for a specific patient
    if request.method == 'GET':
        entries = HealthJournalEntry.query.filter_by(patient_id=patient_id).all()

        entries_dict = [entry.to_dict(rules = ("-favorite_exercises", "-exercises", "-patient", )) for entry in entries]

        response = make_response(
            entries_dict,
            200
        )
    elif request.method == 'POST':
        form_data = request.get_json()

        new_entry = HealthJournalEntry(
            patient_id = patient_id,
            entry_date = form_data['entry_date'],
            content = form_data['content']
        )
        db.session.add(new_entry)
        db.session.commit()

        response = make_response(
            new_entry.to_dict(),
            201
        )
    else:

        response = make_response(
            {"error" : "invalid method"},
            400
        )

    return response

@app.route("/health-journal-entries/<int:entry_id>", methods=['GET', 'PATCH', 'DELETE'])
def health_journal_entry_by_id(entry_id):
    entry = HealthJournalEntry.query.get(entry_id)
    
    if not entry:
        response = make_response(
            {"error": "Health journal entry not found"},
            404
        )
    # get specific health journal entry

    if request.method == 'GET':
        entry_dict = entry.to_dict()

        response = make_response(
            entry_dict,
            200
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
            {},
            201
        )

    return response




if __name__ == '__main__':
    app.run(port=5555, debug=True)


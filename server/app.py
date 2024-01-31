from config import app
from flask import jsonify, request, make_response
from models import db, Patient, Exercise, FavoriteExercise, HealthJournalEntry

@app.route("/patients", methods=['GET'])
def patients():
    patients = Patient.query.all()

    patients_dict = [patient.to_dict() for patient in patients]

    response = make_response(
        patients_dict,
        200
    )
    return response

@app.route("/patients/<int:id>", methods=['GET'])
def patients_by_id(id):
    patient = Patient.query.filter(Patient.id == id).first()

    response = make_response(
        patient.to_dict(),
        200
    )
    return response

@app.route("/exercises", methods=['GET'])
def exercises():
    exercises = Exercise.query.all()

    exercises_dict = [exercise.to_dict(rules = ('-patient', )) for exercise in exercises]

    response = make_response(
        exercises_dict,
        200
    )
    return response
if __name__ == '__main__':
    app.run(port=5555, debug=True)


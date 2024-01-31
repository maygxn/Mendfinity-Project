from config import app
from flask import jsonify, request, make_response
from models import db, Patient, Exercise, FavoriteExercise, HealthJournalEntry


if __name__ == '__main__':
    app.run(port=5555, debug=True)


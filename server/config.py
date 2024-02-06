from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from models import db, Patient, Exercise, FavoriteExercise, HealthJournalEntry

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Set the secret key here
app.secret_key = 'd6514cc60c0a6765ca0d5f269b67c774'  # Replace with the key generated earlier

migrate = Migrate(app, db)
db.init_app(app)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})

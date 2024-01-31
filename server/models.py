# Models go here!
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

db = SQLAlchemy()

class Patient(db.Model, SerializerMixin):
    __tablename__ = "patient"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)

    # Relationships
    health_journal_entries = db.relationship('HealthJournalEntry', back_populates='patient',)
    favorite_exercises = db.relationship('FavoriteExercise', back_populates='patient',)

    # Serialization rules
    serialize_rules = ('-health_journal_entries.patient', '-favorite_exercises.patient',)

class Exercise(db.Model, SerializerMixin):
    __tablename__ = "exercise"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)

    # Relationships
    favorite_exercises = db.relationship('FavoriteExercise', back_populates='exercise',)

    # Serialization rules
    serialize_rules = ('-favorite_exercises.exercise',)

class FavoriteExercise(db.Model, SerializerMixin):
    __tablename__ = "favorite_exercise"

    # Foreign Keys
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), primary_key=True)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.id'), primary_key=True)

    # Relationships
    patient = db.relationship('Patient', back_populates='favorite_exercises')
    exercise = db.relationship('Exercise', back_populates='favorite_exercises')

    # Serialization rules
    serialize_rules = ('-patient.favorite_exercises', '-exercise.favorite_exercises',)

class HealthJournalEntry(db.Model, SerializerMixin):
    __tablename__ = "health_journal_entry"

    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
    entry_date = db.Column(db.Date, nullable=False)
    content = db.Column(db.Text)

    # Relationships
    patient = db.relationship('Patient', back_populates='health_journal_entries')

    # Serialization rules
    serialize_rules = ('-patient.health_journal_entries',)

    # # Validations
    # @validates('entry_date')
    # def validate_entry_date(self, key, value):
    #     return value

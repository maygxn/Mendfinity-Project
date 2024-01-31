from config import app
from models import db, Patient, Exercise, FavoriteExercise, HealthJournalEntry
from datetime import datetime
if __name__ == '__main__':
    with app.app_context():
        print("deleting tables...")
        Patient.query.delete()
        Exercise.query.delete()
        FavoriteExercise.query.delete()
        HealthJournalEntry.query.delete()
        db.session.commit()
        print("creating tables...")

        # Create some patients
        patients = [
            Patient(username="john doe"),
            Patient(username="jane doe")
        ]
        db.session.add_all(patients)
        db.session.commit()

        # Create some exercises
        exercises = [
            Exercise(name="Push-ups", description="Bodyweight exercise for upper body."),
            Exercise(name="Running", description="Cardiovascular exercise.")
        ]
        db.session.add_all(exercises)
        db.session.commit()

        # Create favorite exercises for patients
        favorite_exercises = [
            FavoriteExercise(patient=patients[0], exercise=exercises[0]),
            FavoriteExercise(patient=patients[0], exercise=exercises[1]),
            FavoriteExercise(patient=patients[1], exercise=exercises[0])
        ]
        db.session.add_all(favorite_exercises)
        db.session.commit()

        # Create health journal entries for patients
        health_journal_entries = [
            HealthJournalEntry(patient=patients[0], entry_date=datetime.utcnow(), content="Feeling great today!"),
            HealthJournalEntry(patient=patients[0], entry_date=datetime.utcnow(), content="Worked out for 30 minutes."),
            HealthJournalEntry(patient=patients[1], entry_date=datetime.utcnow(), content="Rest day.")
        ]
        db.session.add_all(health_journal_entries)
        db.session.commit()

        print("Data has been seeded successfully.")

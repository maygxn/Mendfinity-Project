from config import app
from models import db, Patient, Exercise, FavoriteExercise, HealthJournalEntry
from datetime import datetime
from werkzeug.security import generate_password_hash
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
            Patient(username="johntest", password_hash=generate_password_hash("123")),
            Patient(username="janetest", password_hash=generate_password_hash("123"))
            ]
        db.session.add_all(patients)
        db.session.commit()

        # Create some exercises
        exercises = [
            Exercise(
                name="Push-ups", 
                description="Bodyweight exercise for upper body.",
                image_url="https://cdn.pixabay.com/photo/2016/02/16/19/28/burpee-1203906_960_720.jpg"
            ),
            Exercise(
                name="Running", 
                description="Cardiovascular exercise.",
                image_url="https://cdn.pixabay.com/photo/2016/11/14/03/06/woman-1822459_1280.jpg"
            ),
            Exercise(
                name="Ankle Pumps", 
                description="Improve circulation and mobility in the lower legs.",
                image_url="https://api.kramesstaywell.com/Content/6066ca30-310a-4170-b001-a4ab013d61fd/ucr-images-v1/Images/leg-from-knee-down-showing-ankle-pumps-332764"
            ),
            Exercise(
                name="Heel Slides", 
                description="Enhance knee and hip flexibility.",
                image_url="https://static.vecteezy.com/system/resources/previews/021/333/827/original/man-doing-laying-heel-slides-or-knee-bends-exercise-vector.jpg"
            ),
            Exercise(
                name="Quad Sets", 
                description="Strengthen the thigh muscles.",
                image_url="https://images.ctfassets.net/yixw23k2v6vo/6Jhc91bP1aU5VKhf9FENNx/aa19171e7d17054eccf6b1e9bbf42f37/p-GettyImages-1349328568-3000x2000.jpg"
            ),
            Exercise(
                name="Straight Leg Raises", 
                description="Strengthen the hip flexors and stabilize the knee.",
                image_url="https://4.bp.blogspot.com/-gRBm5bYjaME/VvpezkIbY-I/AAAAAAAEwXA/Sq3Rux_nTwM07e2nkYDUbmKuTHAO0fHYw/w1200-h630-p-k-no-nu/maxresdefault.jpg"
            ),
            Exercise(
                name="Seated Knee Extension", 
                description="Improve knee extension and strengthen quadriceps.",
                image_url="https://www.marattmd.com/learn/images/rehab/SeatedKneeExtension2.jpg"
            ),
            Exercise(
                name="Hip Abduction", 
                description="Strengthen hip muscles and improve stability.",
                image_url="https://atemi-sports.com/wp-content/uploads/2023/01/Sumo-Squat-300x230.jpg"
            ),
            Exercise(
                name="Shoulder Blade Squeeze", 
                description="Improve posture and shoulder alignment.",
                image_url="https://api.kramesstaywell.com/Content/6066ca30-310a-4170-b001-a4ab013d61fd/ucr-images-v1/Images/man-from-back-with-elbows-bent-doing-shoulderblade-squeeze-exercise-37545"
            ),
            Exercise(
                name="Neck Stretches", 
                description="Relieve tension and improve neck mobility.",
                image_url="https://images.ctfassets.net/xkgc88uicblq/3XS7mE2xm0nUMOBvYXQEVS/214f9ad7c9caf972f185383f7455a2be/ROM.png?w=920&h=479&q=100&fm=png&bg=transparent"
            ),
            Exercise(
                name="Wall Push-ups", 
                description="Strengthen upper body with minimal stress on wrists.",
                image_url="https://fitnessvolt.com/wp-content/uploads/2022/08/Wall-Push-Up.jpg"
            ),
            Exercise(
                name="Hamstring Stretch", 
                description="Increase flexibility in the back of the thigh.",
                image_url="https://publish.purewow.net/wp-content/uploads/sites/2/2020/05/best-hamstring-stretches-standing-toe-touch.jpg?fit=728%2C524"
            ),
            Exercise(
                name="Piriformis Stretch", 
                description="Relieve sciatic pain and improve hip rotation.",
                image_url="https://www.sportsinjuryclinic.net/wp-content/uploads/2016/11/piriformis-stretch800-800x426.png"
            ),
            Exercise(
                name="Lumbar Extensions", 
                description="Strengthen the lower back and improve posture.",
                image_url="https://cdn.yogajournal.com/wp-content/uploads/2022/06/Upward-Facing-Dog-Mod-1_Andrew-Clark-e1670972827524.jpg"
            ),
            Exercise(
                name="Calf Raises", 
                description="Strengthen calf muscles and improve ankle stability.",
                image_url="https://www.marattmd.com/learn/images/rehab/CalfRaise2Export.jpg"
            ),
            Exercise(
                name="Arm Circles", 
                description="Increase shoulder mobility and upper body strength.",
                image_url="https://www.shutterstock.com/image-vector/woman-doing-arm-circles-exercise-600nw-2050988921.jpg"
            ),
            Exercise(
                name="Wrist Flexion/Extension", 
                description="Improve wrist strength and flexibility.",
                image_url="https://www.researchgate.net/publication/343398049/figure/fig3/AS:920433427759105@1596459838689/The-six-classes-rest-fist-hand-extension-wrist-flexion-wrist-extension-and-pinch.png"
            ),
            Exercise(
                name="Side Leg Raises", 
                description="Strengthen hip abductors and improve balance.",
                image_url="https://www.marattmd.com/learn/images/rehab/StandingHipAbduction2.jpg"
            ),
            Exercise(
                name="Knee to Chest Stretch", 
                description="Relieve lower back tension and stretch the glutes.",
                image_url="https://content.ca.healthwise.net/resources/13.6/en-ca/media/medical/hw/hwkb17_054.jpg"
            ),
            Exercise(
                name="Partial Crunches", 
                description="Strengthen core muscles with reduced back strain.",
                image_url="https://texaspainexperts.com/wp-content/uploads/2019/06/partial-crunches-1024x576.jpg"
            ),
            Exercise(
                name="Cat-Cow Stretch", 
                description="Improve spine mobility and relieve back tension.",
                image_url="https://yanvayoga.com/wp-content/uploads/2020/12/cat-cow-vyayam.jpg"
            ),
            Exercise(
                name="Spinal Twist", 
                description="Increase spinal mobility and stretch the back muscles.",
                image_url="https://images.ctfassets.net/p0sybd6jir6r/2jFThOM3L37UtJH0fUaxrF/a60aa829b884f3e4abbef49240174bcd/safer-reclined-twists-345ab9dca25ba82fbf13450bf1b6dbfb.jpg?w=1600&fm=webp&q=93"
            ),
            Exercise(
                name="Child’s Pose", 
                description="Stretch the spine, glutes, and hamstrings.",
                image_url="https://cdn.yogajournal.com/wp-content/uploads/2021/10/Childs-Pose_Andrew-Clark_1.jpg"
            ),
            Exercise(
                name="Bird Dog", 
                description="Improve core stability and balance.",
                image_url="https://www.muscleandfitness.com/wp-content/uploads/2018/11/Young-Female-Practicing-Yoga-With-A-Bird-Dog-Yoga-Pose.jpg?quality=86&strip=all"
            ),
            Exercise(
                name="Bicep Curls", 
                description="Strengthen the upper arm and improve elbow joint stability.",
                image_url="https://www.verywellfit.com/thmb/plk9oJP3KcuRnBaq8bk3sGrsVjM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/81-3498604-Bicep-arm-curlsGIF2-c7c59f252b1a4ef9b1e181ca05e96084.jpg"
            ),
            Exercise(
                name="Tricep Dips", 
                description="Strengthen the triceps and improve upper body strength.",
                image_url="https://www.verywellfit.com/thmb/L8ErPvWV1_VqdZiD_GlGhUw1IuA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/About-2A15-TricepDips-935-e3cd3eddc0c149fc91299b420aa6b236.jpg"
            ),
            Exercise(
                name="Wrist Curls", 
                description="Improve forearm strength and wrist stability.",
                image_url="https://www.nerdfitness.com/wp-content/uploads/2019/06/wrist-curls-for-grip-strength-wrist-mobility-713x262.jpg"
            ),
            Exercise(
                name="Supine Leg Lifts", 
                description="Strengthen the core and improve lower body stability.",
                image_url="https://static1.squarespace.com/static/5ea57caad08f387b2e9827bd/61c7ae9bf497521cde72e756/6390feb246bc006da41f122b/1671062984753/Supine+Leg+Lifts.png?format=1500w"
            ),
            Exercise(
                name="Glute Bridges", 
                description="Target the glutes, hips, and core for improved stability.",
                image_url="https://img1.wsimg.com/isteam/ip/ba1d1b91-b882-46ae-a86c-4314dd48fdfe/balance%20(7).png"
            )
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

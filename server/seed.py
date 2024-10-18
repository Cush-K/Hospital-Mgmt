from datetime import date, time
from config import db, app  # Assuming you have db and app configured in config.py
from models import Patient, Appointment  # Assuming models.py contains your models
from random import randint
from faker import Faker

# Create a Faker instance to generate random data
faker = Faker()

def seed_database():
    # Clear existing data
    db.session.query(Appointment).delete()
    db.session.query(Patient).delete()
    db.session.commit()

    # Create sample patients
    patients_data = [
        {
            "first_name": "John",
            "last_name": "Doe",
            "age": 30,
            "id_number": "ID123456789",
            "phone_number": "123-456-7890",
            "email": "john.doe@example.com"
        },
        {
            "first_name": "Jane",
            "last_name": "Smith",
            "age": 25,
            "id_number": "ID987654321",
            "phone_number": "987-654-3210",
            "email": "jane.smith@example.com"
        }
    ]

    patients = []
    for patient_data in patients_data:
        patient = Patient(**patient_data)
        patients.append(patient)
        db.session.add(patient)

    # Commit patients to the database
    db.session.commit()

    # Create sample appointments for each patient
    for patient in patients:
        for i in range(3):  # Each patient will have 3 appointments
            appointment_data = {
                "date": date(2024, randint(1, 12), randint(1, 28)),  # Random date
                "time": time(randint(8, 17), randint(0, 59)),  # Random time between 8:00 and 17:59
                "patient_id": patient.id,
                "doctor_id": randint(1, 10)  # Assuming doctor_id is between 1 and 10
            }
            appointment = Appointment(**appointment_data)
            db.session.add(appointment)

    # Commit appointments to the database
    db.session.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    with app.app_context():  # Ensure app context is active
        seed_database()

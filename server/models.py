from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin as sm
db = SQLAlchemy()

class Doctor(db.Model, sm):
    __tablename__ = "doctors"
    
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String)
    doctorId = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email= db.Column(db.String)
    bio = db.Column(db.String)
    education = db.Column(db.String)
    certifications = db.Column(db.String)
    achievements = db.Column(db.String)
    image = db.Column(db.String)
    password = db.Column(db.String)
    
    
    def __repr__(self):
        return f'<User {self.first_name}, {self.last_name}, {self.email}, >'
 
class Patient(db.Model,sm):
    __tablename__ = 'patients'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False) 
    last_name = db.Column(db.String(20), nullable=False) 
    age = db.Column(db.Integer, nullable=False)
    id_number = db.Column(db.String(50), nullable=False, unique=True)  
    phone_number = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)  # New email column

    def __repr__(self):
        return f"<Patient {self.first_name} {self.last_name}, Age: {self.age}, ID: {self.id_number}, Phone: {self.phone_number}, Email: {self.email}>"

class Appointment(db.Model,sm):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    
    # Foreign keys
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)  # References Patient model
    doctor_id = db.Column(db.Integer, nullable=False)  # Assuming doctorId is passed

    # Relationship with Patient
    patient = db.relationship('Patient', backref='appointments', lazy=True)

    def __repr__(self):
        return f"<Appointment {self.date} at {self.time} with Doctor ID {self.doctor_id} for Patient ID {self.patient_id}>"
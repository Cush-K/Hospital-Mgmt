from flask import Flask, request, session, make_response,jsonify
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restful import Api, Resource
from flask_cors import CORS
from sqlalchemy.orm import joinedload

from models import db, Doctor, Department, Patient, Appointment
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images')
app.config['SECRET_KEY'] = os.urandom(24)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.json.compact = False

migrate = Migrate(app, db)
api = Api(app)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:4000"}})

db.init_app(app)

# Department List
class DepartmentList(Resource):
    def get(self):
        departments_dict = [department.to_dict() for department in Department.query.all()]
        return make_response(departments_dict, 200)

# Doctors by Department
@app.route('/api/departments/<int:department_id>/doctors')
def get_doctors_by_department(department_id):
    doctors = Doctor.query.filter_by(department_id=department_id).all()
    return jsonify([doctor.to_card_dict() for doctor in doctors])

# Doctor Profile Information
@app.route('/api/doctors/<int:doctor_id>', methods=['GET'])
def get_doctor_profile(doctor_id):
    doctor = Doctor.query.get_or_404(doctor_id)
    return jsonify(doctor.to_profile_dict())

class DoctorSignup(Resource):
    def post(self):
        data = request.form
        image = request.files.get('image')
        
        if image:
            filename = secure_filename(image.filename)
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image.save(image_path)
        else:
            image_path = None
            
        new_doctor = Doctor(
            title=data.get('title'),
            doctorId=data.get('doctorId'),
            first_name=data.get('firstName'),
            last_name=data.get('lastName'),
            email=data.get('email'),
            bio=data.get('bio'),
            education=data.get('education'),
            certifications=data.get('certifications'),
            specialty=data.get('specialty'),
            image=image_path,
            department_id=data.get('department'),
            password=bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        )

        try:
            db.session.add(new_doctor)
            db.session.commit()
            return new_doctor.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

class DoctorLogin(Resource):
    def post(self):
        data = request.get_json() 
        doctor = Doctor.query.filter_by(email=data['email']).first()

        if doctor and bcrypt.check_password_hash(doctor.password, data['password']):
            session['user_id'] = doctor.id
            session['user_role'] = 'doctor'
            return {
                "message": "Login successful",
                "data": doctor.to_dict(),
                "status": 200
            }
        else:
            return {"error": "Invalid credentials"}, 401
        
class PatientSignup(Resource):
    def post(self):
        data = request.get_json()

        new_patient = Patient(
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            email=data.get('email'),
            age=int(data.get('age')),
            phone_number=data.get('phone_number'),
            gender=data.get('gender'),
            password=bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        )

        try:
            db.session.add(new_patient)
            db.session.commit()
            return new_patient.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

class PatientLogin(Resource):
    def post(self):
        data = request.get_json() 
        
        patient = Patient.query.filter_by(email=data['email']).first()

        if patient and bcrypt.check_password_hash(patient.password, data['password']):
            session['user_id'] = patient.id
            session['user_role'] = 'patient'
            
            return {
                    "message": "Login successful",
                    "data": patient.to_dict(),
                    "status": 200
                }, 200
        else:
            return {"error": "Invalid email or password"}, 401

class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return {"message": "Logged out Successfully!"}, 204

# Check Session Resource
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        user_role = session.get('user_role')

        if user_id and user_role:
            if user_role == 'doctor':
                user = Doctor.query.get(user_id)
            elif user_role == 'patient':
                user = Patient.query.get(user_id) 
            if user:
                return {
                    "user": user.to_dict(),
                    "role": user_role 
                }, 200
            else:
                return {"error": "User not found"}, 404
        return {"error": "Unauthorized"}, 401
    
class DoctorById(Resource):
    def get(self, id):
        doctor = Doctor.query.filter_by(id=id).first()
        return make_response(doctor.to_dict(),200)

class DepartmentList(Resource):
    def get(self):
        departments_dict =[department.to_dict() for department in Department.query.all()]
        
        return make_response(departments_dict, 200)
    
class PatientById(Resource):
    def get(self, id):
        patient = Patient.query.filter_by(id=id).first()
        return make_response(patient.to_dict(),200)
        
class Appointment(Resource):
    def get(self, appointment_id=None):
        # If appointment_id is provided, fetch a single appointment
        if appointment_id:
            appointment = Appointment.query.options(
                joinedload(Appointment.patient), joinedload(Appointment.doctor)
            ).filter_by(id=appointment_id).first()

            if not appointment:
                return {"error": "Appointment not found"}, 404

            return jsonify(appointment.to_dict())

        # Otherwise, return all appointments
        appointments = Appointment.query.options(
            joinedload(Appointment.patient), joinedload(Appointment.doctor)
        ).all()

        return jsonify([appointment.to_dict() for appointment in appointments])

# Register API Resources
api.add_resource(DoctorSignup, '/doctorsignup', endpoint='doctorsignup')
api.add_resource(DoctorLogin, '/doctorlogin', endpoint='doctorlogin')
api.add_resource(Logout, '/logout', endpoint=None)
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

api.add_resource(PatientSignup, '/patientsignup', endpoint='patientsignup')
api.add_resource(PatientLogin, '/patientlogin', endpoint='patientlogin')
api.add_resource(DoctorById, '/doctor/<int:id>')
api.add_resource(PatientById, '/patient/<int:id>')
api.add_resource(Appointment, '/appointments', '/appointments/<int:appointment_id>')


api.add_resource(DepartmentList, '/api/departments', endpoint='departments')  # Updated endpoint


if __name__ == "__main__":
    app.run(port=5555)

from flask import Flask
from Flask_SQLAlchemy import SQLAlchemy
from Flask_serializer import SerializerMixin
from sqlalchemy import MetaData


metadata=MetaData

db =SQLAlchemy(metadata=metadata)

class Patients(db.Model,SerializerMixin):
    
    __tablename__='patients'

    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String,nullable=False)
    age=db.Column(db.Integer,nullable=False)
    medical_history=db.Column(db.Text)
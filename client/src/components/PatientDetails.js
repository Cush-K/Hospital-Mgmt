// PatientDetails.js
import React, { useState, useEffect } from 'react';

const PatientDetails = ({ patientId }) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => { fetch(`http://localhost:4000/patients/${patientId}`)
      .then((response) => response.json()) 
      .then((data) => setPatient(data)); 
    }, [patientId]);

  return (
    <div className="patient-details">
      <h2>Patient Details</h2>
      {patient ? (
        <div>
          <p><strong>ID:</strong> {patient.id}</p>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
        </div>
      ) : (
        <p>No patient found.</p>
      )}
    </div>
  );
};

export default PatientDetails;

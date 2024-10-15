import React from 'react';
import './PatientDashboard.css';  
import PatientDetails from './PatientDetails';

const PatientDashboard = () => {
    const patientId = 1;
  return (
    <div className="dashboard">
      <h2>Patient Dashboard</h2>
      <nav className="dashboard-nav">
        <PatientDetails patientId={patientId}/>
      </nav>
    </div>
  );
}

export default PatientDashboard;

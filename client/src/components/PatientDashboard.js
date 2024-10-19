import React from 'react';
import Header from './Header';
import PatientDetails from './PatientDetails';
import Departments from './Departments';
import './PatientDashboard.css';  

const PatientDashboard = () => {
    const patientId = 1;
    return (
        <div className="dashboard">
            <h2 className="dashboard-title">Patient Dashboard</h2>
            <Header />
            <nav className="dashboard-nav">
                <PatientDetails patientId={patientId} />
            </nav>
            <Departments />
        </div>
    );
}




export default PatientDashboard;
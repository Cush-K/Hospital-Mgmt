import React, { useState } from 'react';
import PatientDetails from './PatientDetails';
import BookAppointment from './BookAppointment';
import Departments from './Departments';
import './PatientDashboard.css';  


const PatientDashboard = () => {
    const patientId = 1;
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);

    const toggleAppointmentForm = () => {
        setShowAppointmentForm(prev => !prev);
    };

    return (
        <div className="dashboard">
            <h2 className="dashboard-title">Patient Dashboard</h2>
            <nav className="dashboard-nav">
                <PatientDetails patientId={patientId} />
                <Departments />
                <div className="appointment-section">
                    <button className="book-appointment-button" onClick={toggleAppointmentForm}>
                        {showAppointmentForm ? 'Cancel Appointment' : 'Book Appointment'}
                    </button>
                    {showAppointmentForm && <BookAppointment />}
                </div>
            </nav>
        </div>
    );
}

export default PatientDashboard;

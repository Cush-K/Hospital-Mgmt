// BookAppointment.js
import React, { useState } from 'react';

const BookAppointment = () => {
  const [patientName, setPatientName] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate booking appointment
    const appointmentData = {
      patientName,
      doctorId,
      date,
      time,
    };

    // Replace with your API endpoint
    const response = await fetch('http://localhost:5000/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    if (response.ok) {
      setMessage('Appointment booked successfully!');
      // Reset form fields
      setPatientName('');
      setDoctorId('');
      setDate('');
      setTime('');
    } else {
      setMessage('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="book-appointment">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="doctorId">Select Doctor:</label>
          <select
            id="doctorId"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Select a doctor</option>
            {/* Replace with actual doctors */}
            <option value="1">Doctor 1</option>
            <option value="2">Doctor 2</option>
            <option value="3">Doctor 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Appointment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookAppointment;

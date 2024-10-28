import React, { useState, useEffect } from 'react';

const DoctorsPatients = ({ doctorId }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patients data based on doctor's ID
  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/patients/${doctorId}`); // Fetch patients by doctor ID
      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }
      const data = await response.json();
      setPatients(data.data); // Access the 'data' field in the response
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [doctorId]); // Fetch patients when doctorId changes

  return (
    <div className="doctors-patients">
      <h2>Patients List</h2>
      {loading ? (
        <div className="spinner">Loading patients...</div>
      ) : error ? (
        <div>
          <p>Error fetching patients: {error}</p>
          <button onClick={fetchPatients}>Retry</button>
        </div>
      ) : patients.length > 0 ? (
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              <strong>Name:</strong> {patient.name} <br />
              <strong>Appointment Date:</strong> {new Date(patient.appointmentDate).toLocaleDateString()} <br />
              <strong>Details:</strong> {patient.details}
              {/* Example of adding a link to patient details */}
              {/* <button onClick={() => viewPatientDetails(patient.id)}>View Details</button> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No patients found.</p>
      )}
    </div>
  );

  // Function to handle viewing patient details (to be implemented)
  // const viewPatientDetails = (id) => {
  //   // Logic to navigate to patient details page
  //   console.log(`Viewing details for patient ID: ${id}`);
    // You can use a router or other navigation method here
  };

export default DoctorsPatients;
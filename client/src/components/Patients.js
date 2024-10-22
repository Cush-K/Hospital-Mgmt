import React, { useEffect, useState } from "react";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('/patients');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatients();
  }, []); // Dependency array ensures the effect runs only once on mount

  if (isLoading) {
    return <p>Loading patients...</p>;
  }

  if (error) {
    return <p>Error fetching patients: {error}</p>;
  }

  if (!Array.isArray(patients) || patients.length === 0) {
    return <p>No patients found.</p>;
  }

  return (
    <div>
      {patients.map((patient) => (
        <div key={patient.id}>
          <p>Name: {patient.first_name} {patient.last_name}</p>
          <p>Gender: {patient.gender}</p>
        </div>
      ))}
    </div>
  );
}

export default Patients;
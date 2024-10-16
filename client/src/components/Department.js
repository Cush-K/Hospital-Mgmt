// Departments.js
import React, { useState, useEffect } from 'react';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      // Replace with your API endpoint
      const response = await fetch('http://localhost:5000/departments');
      const data = await response.json();
      setDepartments(data);
      setLoading(false);
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return <p>Loading departments...</p>;
  }

  return (
    <div className="departments">
      <h2>Departments</h2>
      {departments.length > 0 ? (
        <ul>
          {departments.map((department) => (
            <li key={department.id}>
              <h3>{department.name}</h3>
              <ul>
                {department.doctors.map((doctor) => (
                  <li key={doctor.id}>
                    {doctor.name} - {doctor.available ? 'Available' : 'Not Available'}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No departments found.</p>
      )}
    </div>
  );
};

export default Department;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gallery from './Gallery';
import InfoCards from './InfoCards';
import PatientDashboard from './PatientDashboard';

const images = [
  { url: 'https://img.freepik.com/free-photo/african-american-doctor-patient-doing-consultation_482257-20161.jpg?semt=ais_hybrid', alt: 'xray' },
  { url: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'team' },
  { url: 'https://img.freepik.com/free-photo/confident-doctor-hospital-room_9975-22900.jpg?semt=ais_hybrid', alt: 'innovation' }
];

function App() {
  return (
      <div className="App">
        <Gallery images={images} />
        <InfoCards />
        <PatientDashboard />
      </div>
  );
}

export default App;

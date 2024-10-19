// PatientLogin.js
import React from 'react';

function PatientLogin() {
    return (
        <div>
            <h2>Patient Login</h2>
            <form>
                <div>
                    <label htmlFor="patient-email">Email:</label>
                    <input type="email" id="patient-email" required />
                </div>
                <div>
                    <label htmlFor="patient-password">Password:</label>
                    <input type="password" id="patient-password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default PatientLogin;

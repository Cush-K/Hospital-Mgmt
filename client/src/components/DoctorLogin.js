// DoctorLogin.js
import React from 'react';

function DoctorLogin() {
    return (
        <div>
            <h2>Doctor Login</h2>
            <form>
                <div>
                    <label htmlFor="doctor-email">Email:</label>
                    <input type="email" id="doctor-email" required />
                </div>
                <div>
                    <label htmlFor="doctor-password">Password:</label>
                    <input type="password" id="doctor-password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default DoctorLogin;

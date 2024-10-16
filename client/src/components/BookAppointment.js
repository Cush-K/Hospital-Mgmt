import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './BookAppointment.css';

const BookAppointment = () => {
    const validationSchema = yup.object().shape({
        date: yup.string().required('Date is required'),
        time: yup.string().required('Time is required'),
    });

    const formik = useFormik({
        initialValues: {
            date: '',
            time: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
                // POST request to send the appointment data to the backend
                const response =  fetch('http://localhost:3000/appointments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values), // Send form values as JSON
                });

                if (response.ok) {
                    alert('Appointment booked successfully!');
                    resetForm(); // Reset the form after successful submission
                } else {
                    alert('Failed to book appointment. Please try again.');
                }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="appointment-form">
            <div className="form-field">
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                />
                {formik.touched.date && formik.errors.date && <p className="errors">{formik.errors.date}</p>}
            </div>

            <div className="form-field">
                <label htmlFor="time">Time:</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.time}
                />
                {formik.touched.time && formik.errors.time && <p className="errors">{formik.errors.time}</p>}
            </div>

            <button type="submit" className="submit-button">Submit Appointment</button>
        </form>
    );
};

export default BookAppointment;

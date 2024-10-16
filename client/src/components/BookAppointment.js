import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './BookAppointment.css';

const BookAppointment = () => {
    const validationSchema = yup.object().shape({
        date: yup.string().required('Date is required'),
        time: yup.string().required('Time is required'),
        doctor: yup.string().required('Doctor selection is required'),
    });

    const formik = useFormik({
        initialValues: {
            date: '',
            time: '',
            doctor: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log('Appointment Details:', values);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            alert('Appointment booked successfully!');
            resetForm();
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

            <div className="form-field">
                <label htmlFor="doctor">Select Doctor:</label>
                <select
                    id="doctor"
                    name="doctor"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.doctor}
                >
                    <option value="" label="Select doctor" />
                    <option value="Dr. Smith">Dr. Smith</option>
                    <option value="Dr. Jones">Dr. Jones</option>
                </select>
                {formik.touched.doctor && formik.errors.doctor && <p className="errors">{formik.errors.doctor}</p>}
            </div>

            <button type="submit" className="submit-button">Submit Appointment</button>
        </form>
    );
};

export default BookAppointment;

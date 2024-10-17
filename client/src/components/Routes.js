import React from "react";
import App from "./App";
import Signup from "./Signup";
import Login from "./Login";
import Departments from "./Departments";
import Doctors from "./Doctors";
import DoctorProfile from "./DoctorProfile";
import PatientDashboard from './PatientDashboard'
import PatientDetails from "./PatientDetails";
import BookAppointment from "./BookAppointment";

const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/Patient-dashboard',
        element: <PatientDashboard />
    },
    {
        path: "/departments",
        element: <Departments />
    },
    {
        path: "/departments/:departmentId", 
        element: <Doctors />
    },
    {
        path: "/doctors/:doctorId/profile",
        element: <DoctorProfile />
    },
    {
        path : '/patient-details',
        element : <PatientDetails/>
    },
    {
        path: "/book-appointment/:id",
        element: <BookAppointment />,
      }

]


export default routes;
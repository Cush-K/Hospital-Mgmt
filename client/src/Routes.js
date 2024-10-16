// src/Routes.js
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import Signup from "./components/Signup";
import PatientDashboard from "./components/PatientDashboard";

const routes = [
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/patient-dashboard',
        element: <PatientDashboard />
    },
];

const router = createBrowserRouter(routes);

export default router;

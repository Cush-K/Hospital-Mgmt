import React from 'react';
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import Home from '/.components/Home';
import About from '/.components/About';
import Contact from '/.components/contact';

const AppRouter =()=>{
    return(
        <Router>
            <switch>
                <Route path="exact component={Home}"/>
                <Route path="exact component={About}"/>
                <Route path="exact component={Contact}"/>

            </switch>
        </Router>
    );

};
export default AppRouter;
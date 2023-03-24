import React from 'react';

import logo_project from "../../../images/SN.AI_logo.png";
import "./Header.css"

export function Header() {

    console.log("Header");

    return(
        <>
    
            <div className="navbar">
                <div>
                <a href="/HomePage">Home</a>
                </div>
                <div>
                <a href="/About">About</a>
                </div>
                <div>
                <a href="/Contact">Contact</a>
                </div>
                <div>
                <a href="/Credits">Credits</a>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">Services
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="/Dashboard">Dashboard</a>
                        <a href="/Prediction">Prediction</a>
                        {/* <a href="/AddAnnotation">Add Annotation</a> */}
                        <a href="/ExportData">Export data</a>
                    </div>
                </div>
                <div className="push">
                <a  href="/SignIn">Login</a>
                </div>
            </div>
        </>
    );
}


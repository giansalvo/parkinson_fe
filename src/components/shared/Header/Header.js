import React from 'react';

import logo_project from "../../../images/SN.AI_logo.png";
import "./Header.css"

export function Header() {

    console.log("Header");

    return(
        <>
            <div class="navbar">
                <a href="/HomePage">Home</a>
                <a href="/About">About</a>
                <a href="/Contact">Contact</a>
                <a href="/Credits">Credits</a>
                <div class="dropdown">
                    <button class="dropbtn">Services
                        <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
                        <a href="/Dashboard">Dashboard</a>
                        <a href="/Prediction">Prediction</a>
                        <a href="/AddAnnotation">Add Annotation</a>
                    </div>
                   </div>
                <a class="header_login" href="/SignIn">Login</a>
            </div> 
        </>
    );
}


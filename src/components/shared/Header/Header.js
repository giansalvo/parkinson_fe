import React, { Component } from 'react';
import { Link } from "react-router-dom";

import logo_project from "../../../images/SN.AI_logo.png";
import "./Header.css"

export function Header() {

    console.log("Header");

    return(
        <>
            <div class="header_row">
                <div class="header_column">
                    <div>
                        <Link to="/HomePage"><img src = {logo_project} height="60" alt="project logo"/></Link>
                        
                    </div>
                    <div>
                        <Link to="/HomePage">Home</Link>
                    </div>
                    <div>
                    <Link to="/About">About Us</Link>
                    </div>
                    <div>
                    <Link to="/Contact">Contacts</Link>
                    </div>
                    <div>
                    <Link to="/Credits">Credits</Link>
                    </div>
                </div>
                <div class="header_login">
                    <Link to="/SignIn">Login</Link>
                </div>
            </div>
        </>
    );
}


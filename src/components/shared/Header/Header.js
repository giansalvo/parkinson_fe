import React, { Component } from 'react';
import { Link } from "react-router-dom";

import logo_project from "../../../images/project_logo.svg";
import "./Header.css"

export function Header() {

    console.log("Header");

    return(
        <>
            <div class="header_row">
                <div class="header_column">
                    <div>
                        <img src = {logo_project} height="30" alt="project logo"/>
                    </div>
                    <div>
                        <Link to="/HomePage">Home</Link>
                    </div>
                    <div>
                    <Link to="/About">About</Link>
                    </div>
                    <div>
                    <Link to="/Contact">Contact</Link>
                    </div>

                </div>
                <div class="header_login">
                    <Link to="/SignIn">Login</Link>
                </div>
            </div>
        </>
    );
}


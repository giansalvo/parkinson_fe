import React, { Component } from 'react';

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
                        Home
                    </div>
                    <div>
                        About
                    </div>
                    <div>
                        Contact
                    </div>

                </div>
                <div class="header_login">
                    Login/Register
                </div>
            </div>
        </>
    );
}


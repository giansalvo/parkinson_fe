import React, { Component } from 'react';

import "./Footer.css"

import logo_abinsula from '../../../images/abinsula_logo.png';
import logo_uniss from '../../../images/uniss_logo.png';

export function Footer() {

    console.log("Footer");

    return(
            <footer class="footer_row">
                <div class="footer_column">
                    <img src = {logo_abinsula} height="50" alt="Abinsula logo"/>
                </div>
                <div class="footer_column">
                    <img src = {logo_uniss} height="50" alt="UNISS logo"/>
                </div>
            </footer>
    );
}

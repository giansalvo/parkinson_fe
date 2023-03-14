import React, { Component } from 'react';

import "./Footer.css"

import logo_abinsula from '../../../images/abinsula_logo.png';
import logo_uniss from '../../../images/uniss_logo.png';
import logo_PON from '../../../images/PON_logo.png';

export function Footer() {

    console.log("Footer");

    return(
            <footer class="footer_row">
                <div class="footer_column">
                    <a href="https://www.uniss.it" target="_blank"><img src = {logo_uniss} height="50" alt="UNISS logo"/></a> 
                </div>
                <div class="footer_column">
                    <img src = {logo_PON} height="50" alt="PON logo"/>
                </div>
                <div class="footer_column">
                    <a href="https://www.abinsula.com" target="_blank"><img src = {logo_abinsula} height="50" alt="Abinsula logo"/></a> 
                </div>
            </footer>
    );
}

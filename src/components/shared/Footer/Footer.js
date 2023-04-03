import React from 'react';

import "./Footer.css"

import logo_abinsula from '../../../images/abinsula_logo.png';
import logo_uniss from '../../../images/uniss_logo.png';
import logo_PON from '../../../images/PON_logo.png';

export function Footer() {

    console.log("Footer");

    return(
            <footer className="footer_row">
                <div className="footer_column">
                    <a href="https://www.uniss.it" target="_blank" rel="noreferrer"><img src = {logo_uniss} height="50" alt="UNISS logo"/></a> 
                </div>
                <div className="footer_column">
                    <a href="https://www.miur.gov.it/web/guest/-/programma-operativo-nazionale-ricerca-e-innovazione-2014-2020-dottorati-innovativi-con-caratterizzazione-industriale-xxxiv-ciclo" target="_blank" rel="noreferrer"><img src = {logo_PON} height="50" alt="PON logo"/></a> 
                </div>
                <div className="footer_column">
                    <a href="https://www.abinsula.com" target="_blank" rel="noreferrer"><img src = {logo_abinsula} height="50" alt="Abinsula logo"/></a> 
                </div>
            </footer>
    );
}

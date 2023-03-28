import React from 'react';
import i18n from "../../../i18n"

import "./Header.css"

const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' },
    it: { nativeName: 'Italiano' }
  };
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
                        <a href="/AddAnnotation">Add Annotation</a>
                        <a href="/ExportData">Export data</a>
                    </div>
                </div>
                <div className="push">
                    {Object.keys(lngs).map((lng) => (
                        <button className="button_language" key={lng}
                            style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                            {lngs[lng].nativeName}
                        </button>
                    ))}
                    <a  href="/SignIn">Login</a>
                </div>
            </div>
        </>
    );
}


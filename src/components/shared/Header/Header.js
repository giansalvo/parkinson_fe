import React from 'react';
import { useTranslation} from 'react-i18next';
import i18n from "../../../i18n"

import "./Header.css"

const lngs = {
    en: { nativeName: 'English' },
    it: { nativeName: 'Italiano' }
  };
export function Header() {

    console.log("Header");

    const { t } = useTranslation();

    return(
        <>
          <div className="navbar">
                <div>
                <a href="/HomePage">{t('menu.p1')}</a>
                </div>
                <div>
                <a href="/About">{t('menu.p2')}</a>
                </div>
                <div>
                <a href="/Contact">{t('menu.p3')}</a>
                </div>
                <div>
                <a href="/Credits">{t('menu.p4')}</a>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">{t('menu.p5')}
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="/Dashboard">{t('menu.p5_1')}</a>
                        <a href="/Prediction">{t('menu.p5_2')}</a>
                        <a href="/AddAnnotation">{t('menu.p5_3')}</a>
                        <a href="/ExportData">{t('menu.p5_4')}</a>
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


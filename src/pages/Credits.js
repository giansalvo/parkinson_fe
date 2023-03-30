import React from "react";
import styled from 'styled-components'
import { useTranslation} from 'react-i18next';

import "./HomePage.css"
import {Header} from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

import img5 from "../images/img_ai5.jpg"

const Styles = styled.div`
.container {
  display: flex;
  align-items: center;
  justify-content: center
}
img {
  height: 50vh
}
.image {
  flex-basis: 50%
  padding-left: 20px;
  padding-right: 20px;
  max-width: 50hh
}
.text {
  font-size: 20px;
  padding-left: 20px;
  max-width: 50hh
}
`

function Credits() {

  console.log("Credits")

  const { t } = useTranslation();

  return (
      <div className="main_container">
        <Header/>
        <Styles>
        <div className="container">
          <div className="image">
            <img src={img5} alt="Artificial Intelligence"/>
          </div>
          <div className="text">
          {t('credits.p1')} <a href="https://www.uniss.it" target="_blank" rel="noreferrer">{t('credits.p2')}</a>
          <br/><br/>
          {t('credits.p3')}<a href="https://abinsula.com" target="_blank"  rel="noreferrer">{t('credits.p4')}</a>{t('credits.p5')}
          <br/><br/>
          {t('credits.p6')}<a href="https://www.istruzione.it/pon/index.html" target="_blank"  rel="noreferrer">{t('credits.p7')}</a>.
          </div>
        </div>
        </Styles>
        <Footer/>
    </div>
  );
}

export default Credits;

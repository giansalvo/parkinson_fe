import React from "react";
import styled from 'styled-components'
import { useTranslation} from 'react-i18next';

import "./HomePage.css"
import {Header} from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

import img4 from "../images/img_ai4.jpg"

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

function HomePage() {

  console.log("HomePage")

  const { t } = useTranslation();

  return (
      <div className="main_container">
        <Header/>
        <Styles>
        <div className="container">
        <div className="text">
            {t('contact.p1')}
            <br/><br/>
            {t('contact.p2')}
            <br/><br/>
            <center>
            <a href="mailto:g.gusinu@phd.uniss.it">{t('contact.p3')}</a>
            </center>
          </div>
          <div className="image">
            <img src={img4} alt="Artificial Intelligence"/>
          </div>
        </div>
        </Styles>
        <Footer/>
    </div>
  );
}

export default HomePage;

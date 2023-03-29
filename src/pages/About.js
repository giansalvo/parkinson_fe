import React from "react";
import styled from 'styled-components'
import { useTranslation} from 'react-i18next';

import "./HomePage.css"
import {Header} from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

import img2 from "../images/img_ai2.jpg"

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
        <div class="container">
          <div class="image">
            <img src={img2} alt="Artificial Intelligence"/>
          </div>
          <div class="text">
          {t('about.p1')} <a href="https://www.uniss.it" target="_blank" rel="noreferrer">{t('about.p2')}</a>
          <br/><br/>
          {t('about.p3')}
          <br/><br/>
          {t('about.p4')}
          {t('about.p5')}
          </div>
        </div>
        </Styles>
        <Footer/>
    </div>
  );
}

export default HomePage;

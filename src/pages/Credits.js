import React from "react";
import styled from 'styled-components'

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

  return (
      <div className="main_container">
        <Header/>
        <Styles>
        <div class="container">
          <div class="image">
            <img src={img5} alt="Artificial Intelligence"/>
          </div>
          <div class="text">
          This research was developed by Giansalvo Gusinu, Dr Claudia Frau, Prof. Giuseppe A. Trunfio, Prof. Paolo Solla and Prof. Leonardo A. Sechi at <a href="https://www.uniss.it" target="_blank" rel="noreferrer">UNISS</a>
          <br/><br/>
          The website was realized in collaboration with the company <a href="https://abinsula.com" target="_blank"  rel="noreferrer">Abinsula</a>, one of the main Italian players in Embedded, IoT, Web and Mobile solutions.
          <br/><br/>
          The funds for the scholarship were obtained from Italian Ministry of Education through <a href="https://www.istruzione.it/pon/index.html" target="_blank"  rel="noreferrer">PON project 2014-2020</a>.
          </div>
        </div>
        </Styles>
        <Footer/>
    </div>
  );
}

export default Credits;

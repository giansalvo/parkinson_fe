import React from "react";
import styled from 'styled-components'

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

 return (
      <div className="main_container">
        <Header/>
        <Styles>
        <div class="container">
        <div class="text">
          We would like to build a bigger dataset. For this raison we are open for collaborations with other researchers and doctors.
            <br/><br/>
            For futher information about artificial intelligence applied to Parkinson's disease early detection or for participating to this project, please send an email to: 
            <br/><br/>
            <center>
            <a href="mailto:g.gusinu@phd.uniss.it">g.gusinu@phd.uniss.it</a>
            </center>
          </div>
          <div class="image">
            <img src={img4} alt="Artificial Intelligence"/>
          </div>
        </div>
        </Styles>
        <Footer/>
    </div>
  );
}

export default HomePage;

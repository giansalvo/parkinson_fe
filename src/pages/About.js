import React from "react";
import styled from 'styled-components'

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

    return (
      <div className="main_container">
        <Header/>
        <Styles>
        <div class="container">
          <div class="image">
            <img src={img2} alt="Artificial Intelligence"/>
          </div>
          <div class="text">
          This project is the result of a PhD research in the course of Basic Lifesciences and Biotechnologies at <a href="https://www.uniss.it" target="_blank">University of Sassari</a>
          <br/><br/>
          Our aim is to design and build a Computer Aided Detection (CAD) system that could perform automatic Parkinson's disease (PD) detection as efficiently as a human expert.
          <br/><br/>
          In this study we developed a segmentation framework that uses only well-known, existing network model, with a good trade off between performance and resource consumption.
          The framework is able to segment the Substantia Nigra, found in 90% of Parkinson's patients.
          </div>
        </div>
        </Styles>
        <Footer/>
    </div>
  );
}

export default HomePage;

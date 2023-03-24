import React from "react";

import "./HomePage.css"
import {Header} from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

function HomePage() {

  console.log("HomePage")

    return (
      <div className="main_container">
        <Header/>
        <div className="message">
          This project is the resulut of a PhD research in the course of Basic Lifesciences and Biotechnologies at <a href="https://www.uniss.it" target="_blank">University of Sassari</a>
          <br/><br/>
          Our aim is to design and build a Computer Aided Detection (CAD) system that could perform automatic Parkinson's disease (PD) detection as efficiently as a human expert.
          <br/><br/>
          In this study we developed a segmentation framework that uses only well-known, existing network model, with a good trade off between performance and resource consumption.
          The framework is able to segment the Substantia Nigra, found in 90% of Parkinson's patients.
        </div>
        <Footer/>
    </div>
  );
}

export default HomePage;

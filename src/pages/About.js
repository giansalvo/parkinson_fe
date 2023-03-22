import React from "react";
import { useForm } from "react-hook-form";
import { Outlet, Link } from "react-router-dom";

import "./HomePage.css"
import {Header} from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

function HomePage() {

  console.log("HomePage")

  const { handleSubmit, formState: { errors } } = useForm();

  function onSubmit (data) {
      console.log("onSubmit")
      // push
    };

    return (
      <div class="main_container">
        <Header/>
        <div class="message">
          Our aim is to design and build a CAD (Computer Aided Detection) system that could perform automatic PD detection as efficiently as a human expert.
          In this study we developed a segmentation framework that uses only well-known, existing network model, with a good trade off between performance and resource consumption.
          The framework is able to segment the Substantia Nigra, found in 90% of Parkinson's patients.
        </div>
        <Footer/>
    </div>
  );
}

export default HomePage;

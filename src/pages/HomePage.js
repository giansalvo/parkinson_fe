import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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
          <h2>
            Welcome! This website uses a Neural Network Artificial Intelligence to identify and highlight the Substantia Nigra found in Parkinson's patients.
            You can either try it with the following button or register to participate to the project and send new images. 
            In this case you will help us develop a more performant syste.
            <form onSubmit={handleSubmit(onSubmit)}>
            <input type="submit"/>          
            </form>
            <Link to="/Prediction">Prediction</Link>
          </h2>
        </div>
        <Footer/>
    </div>
  );
}

export default HomePage;

import React from "react";
import { useForm } from "react-hook-form";

import "./HomePage.css"
import {Header} from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

function HomePage() {

  console.log("HomePage")

  const { formState: { errors } } = useForm();

  return (
      <div className="main_container">
        <Header/>
        <div className="message">
            We would like to build a bigger dataset. For this raison we are open for collaborations with other researchers and doctors.
            <br/><br/>
            For futher information about artificial intelligence applied to Parkinson's disease early detection or for participating to this project, please send an email to: 
            <br/><br/>
            <center>
            <a href="mailto:g.gusinu@phd.uniss.it">g.gusinu@phd.uniss.it</a>
            </center>
        </div>
        <Footer/>
    </div>
  );
}

export default HomePage;

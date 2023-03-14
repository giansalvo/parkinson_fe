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
          <h2>
            We would like to build a bigger dataset. For this raison we are open for collaborations with other researchers and doctors.
            For futher information about artificial intelligence applied to Parkinson's early detection or for participating, please send an email to: g.gusinu@phd.uniss.it
          </h2>
        </div>
        <Footer/>
    </div>
  );
}

export default HomePage;

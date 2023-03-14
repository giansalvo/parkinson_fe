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
            Contact page
          </h2>
        </div>
        <Footer/>
    </div>
  );
}

export default HomePage;

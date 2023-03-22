import React from "react";
import { useForm } from "react-hook-form";

import "./HomePage.css"
import {Header} from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

function HomePage() {

  console.log("HomePage")

  const {formState: { errors } } = useForm();

  return (
      <div class="main_container">
        <Header/>
        <div class="message">
          <h2>
          Page Not Found!
          </h2>
        </div>
        <Footer/>
    </div>
  );
}

export default HomePage;

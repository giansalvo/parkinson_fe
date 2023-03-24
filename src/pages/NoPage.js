import React from "react";
import { useForm } from "react-hook-form";

import "./HomePage.css"
import {Header} from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

function HomePage() {

  console.log("HomePage")

  const {formState: { errors } } = useForm();

  return (
      <div className="main_container">
        <Header/>
        <div className="message">
          <h2>
          Page Not Found!
          </h2>
        </div>
        <Footer/>
    </div>
  );
}

export default HomePage;

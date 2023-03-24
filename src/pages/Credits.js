import React from "react";
import { useForm } from "react-hook-form";

import "./HomePage.css"
import {Header} from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

function Credits() {

  console.log("Credits")

  const { formState: { errors } } = useForm();

  return (
      <div className="main_container">
        <Header/>
        <div className="message">
          This research was developed by Giansalvo Gusinu, Dr Claudia Frau, Prof. Giuseppe A. Trunfio, Prof. Paolo Solla and Prof. Leonardo A. Sechi at <a href="https://www.uniss.it" target="_blank">UNISS</a>
          <br/><br/>
          The website was realized in collaboration with the company <a href="https://abinsula.com" target="_blank">Abinsula</a>, one of the main Italian players in Embedded, IoT, Web and Mobile solutions.
          <br/><br/>
          The funds for the scholarship were obtained from Italian Ministry of Education through <a href="https://www.istruzione.it/pon/index.html" target="_blank">PON project 2014-2020</a>.
        </div>
        <Footer/>
    </div>
  );
}

export default Credits;

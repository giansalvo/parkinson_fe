import React from "react";
import { useForm } from "react-hook-form";

import "./HomePage.css"
import {Header} from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

function Credits() {

  console.log("Credits")

  const { formState: { errors } } = useForm();

  return (
      <div class="main_container">
        <Header/>
        <div class="message">
          This research was developed by Giansalvo Gusinu, Dr Claudia Frau, Prof. Giuseppe A. Trunfio, Prof. Paolo Solla and Prof. Leonardo A. Sechi.
          The website was realized in collaboration with Abinsula.
          Some funds were obtained by project PON 2014-2020.
        </div>
        <Footer/>
    </div>
  );
}

export default Credits;

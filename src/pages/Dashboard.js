import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Dashboard.css"
import { Header } from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

function Dashboard() {

  console.log("Dashboard")

  const [content, setContent] = useState(null)
  const { handleSubmit, formState: { errors } } = useForm();

  function onSubmit (data) {
    console.log("Data:", data)

    axios
    .post(
        "http://[::1]:8438/prediction/do-dashboard/",
        "",
        {
            headers: {
                "Content-type": "multipart/form-data",
            },
            responseType: "arraybuffer",
        }
    )
    .then((res) => {
        setContent("blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah... ..blah blah blah...")
        alert("OK")
    })
    .catch((err) => {
        alert("NOK")      
        console.log("Error: " + err);
    })
  };

  return (
    <div class="main_container">
      <Header/>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="submit" />
        </form>
        <div class="FixedHeightContainer">
            <h2>Click the button to get data</h2>
            <div class="Content">
              {content}
            </div>
        </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;

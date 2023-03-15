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
    .get(
        "http://[::1]:8438/prediction/do-dashboard/",
        "",
        {
            headers: {
                "Content-type": "multipart/form-data",
            },
            responseType: "application/JSON", // TODO verify thiss
        }
    )
    .then((res) => {
        data = JSON.stringify(res);
        const obj = JSON.parse(data);
        // alert("Request succesfull.");
        // console.log("obj.data title " + obj.data.predictions[0].title);

        var lenght = Object.keys(obj.data.predictions).length;
        console.log("lenght " + lenght)

        var pObj = obj.data.predictions;
        var text = "";
        for(var i = 0; i < lenght; i++)
        {
              // console.log(pObj[i].title);
              text += pObj[i].title + "\n";
        }
        setContent(text);

    })
    .catch((err) => {
        alert("Error during request.")      
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

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

        var lenght = Object.keys(obj.data.predictions).length;
        console.log("lenght " + lenght)

        var pObj = obj.data.predictions;
        // console.log(pObj)
        setContent(pObj);

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
              <div>
                patient title description age 
              </div>
              {content && content.map((record)=>(
                <div class="record">
                  <p>
                    {record.patient_id}
                  </p>
                  <p>
                    {record.title}
                  </p>
                  <p>
                    {record.description}
                  </p>
                  <p>
                    {record.patient_age}
                  </p>
                </div>
              ))}
            </div>
        </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;

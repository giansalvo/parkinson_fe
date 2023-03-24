import React from "react";
import { CSVLink } from "react-csv";

import "./HomePage.css"
import {Header} from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

function ExportData() {

  console.log("ExportData")

  const headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" }
  ];
  
  const data = [
    { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
  ];

  return (
        <div class="main_container">
            <Header/>
            <div class="message">
            Here you can download all data records. The download should start shortly and take just a few seconds. This data can be used only for research purposes.
            By clicking the following button you agree to follow our Terms & Conditions.
            <br/><br/>
            <center>
            <CSVLink 
                data={data} 
                headers={headers}
                className="button3"
            >
                Export Data
            </CSVLink>
            </center>
            </div>
            <Footer/>
        </div>
  );
}

export default ExportData;

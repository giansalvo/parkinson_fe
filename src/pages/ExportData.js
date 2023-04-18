import React, { useState } from 'react'
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import axios from 'axios'
import { useTranslation} from 'react-i18next';
import {ExportToExcel} from './ExportToExcel'
import {GetItem} from "../utils/storage";
import "./HomePage.css"
import {Header} from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";


function ExportData() {

  console.log("ExportData")

  const { t } = useTranslation();

  const [data, setData] = React.useState([])
  const fileName = "dataset_sn_ai"; // here enter filename for your excel file

  const isLoggedIn = Boolean(GetItem("logged_in"))

  React.useEffect(() => {
    const fetchData = () =>{
    axios.get("http://[::1]:8438/prediction/do-dashboard/")
    .then((res) => {
        const obj = res.data.predictions;
        setData(obj);
        // alert("Data exported correctly.")
     })
     .catch((err) => {
        alert("Error during request.")      
        console.log("Error: " + err);
    })
    }
    fetchData()
  }, [])

  return (
    <> {!isLoggedIn ? 
      <Redirect to="SignIn"/> 
      :
        <div className="main_container">
            <Header/>
            <div className="message">
            {t('export.p1')}
            <br/>
            {t('export.p2')}
            <br/>
            {t('export.p3')}
            <br/><br/>
            <center>
            <ExportToExcel apiData={data} fileName={fileName}/>
            </center>
            </div>
            <Footer/>
        </div>
      }
    </>
  );
}

export default ExportData;

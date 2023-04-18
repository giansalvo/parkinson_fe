import React from 'react'
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import request from "../utils/request"
import { useTranslation} from 'react-i18next';
import {ExportToExcel} from './ExportToExcel'
import {GetItem} from "../utils/storage";
import "./HomePage.css"
import {Header} from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

export const getDataCvsAPI = (url_param) => {
  return request(
    {
      url: url_param,
      method: 'GET',
    },
    true,
  );
}

function ExportData() {

  console.log("ExportData")

  const { t } = useTranslation();

  const [data, setData] = React.useState([])
  const fileName = "dataset_sn_ai"; // here enter filename for your excel file

  const isLoggedIn = Boolean(GetItem("logged_in"))
  const url = "http://[::1]:8438/prediction/do-dashboard/"

  React.useEffect(() => {
    const fetchData = () =>{
      getDataCvsAPI(url).then(
        result => {
          const obj = result.data.predictions;
          setData(obj);
        }
      )
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

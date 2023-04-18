import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation} from 'react-i18next';
import request from "../utils/request"

import "./Prediction.css"
import {Header} from "../components/shared/Header/Header";

import image_placeholder from "../images/image_placeholder.png"
import { Footer } from "../components/shared/Footer/Footer";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

export const postPredictionAPI = (url_param, formData) => {
  return request(
    {
      method: 'POST',
      url: url_param,
      data: formData,
      responseType: "arraybuffer",
    },
    false,
    true
  );
  
}

function Prediction() {

  console.log("Prediction")

  const { t } = useTranslation();

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

    const changeHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
          alert("Image mime type is not valid");
          return;
        }
        setFile(file);
      }
      useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
          fileReader = new FileReader();
          fileReader.onload = (e) => {
            const { result } = e.target;
            if (result && !isCancel) {
              setFileDataURL(result)
            }
          }
          fileReader.readAsDataURL(file);
        }
        return () => {
          isCancel = true;
          if (fileReader && fileReader.readyState === 1) {
            fileReader.abort();
          }
        }
    
      }, [file]);
    

    function onSubmit (data) {
        console.log("Data:", data)
        console.log("Data.image[0]:", data.image[0])

        const formData = new FormData()
        formData.append("image", data.image[0])

        console.log("formData:", formData)

        const url_param = "http://[::1]:8438/prediction/do-prediction/"
        postPredictionAPI(url_param, formData).then(
          result =>  {
            // console.log("result.data ", result.data)
            var bytes = new Uint8Array(result.data);
            const blob = new Blob( [ bytes ] );
            const url = URL.createObjectURL( blob );
            setPrediction(url);
            console.log("prediction url", prediction)
          }
        ) .catch (error => 
          console.log("error: ", error)
        )
    };

    return (
      <div className="main_container">
        <Header/>
        <div className="row">
          <div className="column_form">
              <form onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="image">{t('prediction.p5')} </label>
                  <input type="file" {...register("image", { required: true })} 
                      accept='.png, .jpg, .jpeg'
                      onChange={changeHandler} />
                  <br/>
                  <input className="button3" type="submit" />
                  <br/><br/><br/>
                  {t('prediction.p1')}
                  <br/>
                  {t('prediction.p2')}
              </form>
          </div>
          <div className="column_images">
              <h2>{t('prediction.p3')}</h2>
              {fileDataURL ?
              <div className="img-preview-wrapper">
              {
                  <img src={fileDataURL} width="100%" alt="preview" />
              }
              </div> : <img src = {image_placeholder} width="100%" alt="placeholder"/>}
          </div>
          <div className="column_images">
              <h2>{t('prediction.p4')}</h2>
              {prediction ?
              <div className="img-preview-wrapper">
              {
                  <img src={prediction} width="100%" alt="preview" />
              }
              </div> : <img src = {image_placeholder} width="100%" alt="placeholder"/>}
          </div>
        </div>
        <Footer/>
    </div>
  );
}

export default Prediction;

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import fileDownload from 'js-file-download'

import "./Prediction.css"
import {Header} from "../components/shared/Header/Header";

import image_placeholder from "../images/image_placeholder.png"
import { Footer } from "../components/shared/Footer/Footer";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function Prediction() {

  console.log("Prediction")

    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [prediction, setPrediction] = useState(null);

    const [fields, setFields] = useState({
        image: null,
        ground_truth_TODO: null,
        title: "",
        description: "",
        patient_id: "",
        patient_age: "",
        user_id: 1});

    const { register, handleSubmit, formState: { errors } } = useForm();

    // var FileSaver = require('file-saver');

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
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("patient_id", data.patient_id);
        formData.append("patient_age", data.patient_age);
        formData.append("user_id", data.user_id);

        console.log("formData:", formData)

        axios
        .post(
            "http://[::1]:8438/prediction/do-prediction/",
            formData,
            {
                headers: {
                    "Content-type": "multipart/form-data",
                },
                responseType: "arraybuffer",
            }
        )
        .then((res) => {
            // console.log("The request was successfull");
            // console.log(res.data)
            
            var bytes = new Uint8Array(res.data);
            const blob = new Blob( [ bytes ] );
            const url = URL.createObjectURL( blob );
            setPrediction(url);
            // fileDownload(prediction, "pippo.jpg")
        })
        .catch((err) => {
            console.log("Error: " + err);
        })
    };

    return (
      <div class="main_container">
        <Header/>
        <div class="row">
          <div class="column_form">
              <form onSubmit={handleSubmit(onSubmit)}>
                  <label for="image">Image: </label>
                  <input type="file" {...register("image", { required: true })} 
                      accept='.png, .jpg, .jpeg'
                      onChange={changeHandler} />
                  <br/>
                  <label for="title">Title: </label>
                  <br/>
                  <input {...register("title", { required: true })} />
                  <br/>
                  <label for="description">Description: </label>
                  <br/>
                  <input {...register("description", { required: true })} />
                  <br/>
                  <label for="user_id">User ID: </label>
                  <br/>
                  <input {...register("user_id", { required: true })} />
                  <br/>
                  <label for="patient_id">Patient ID: </label>
                  <br/>
                  <input {...register("patient_id", { required: true })} />
                  <br/>
                  <label for="patient_age">Patient age: </label>
                  <br/>
                  <input {...register("patient_age", { required: true })} />
                  <br/><br/>

                  {errors.title       && <span>This field is required</span>}
                  {errors.patient_id  && <span>This field is required</span>}        
                  {errors.user_id     && <span>This field is required</span>}        
                  
                  <input type="submit" />
              </form>
          </div>
          <div class="column_images">
              <h2>Patient image</h2>
              {fileDataURL ?
              <div className="img-preview-wrapper">
              {
                  <img src={fileDataURL} width="100%" alt="preview" />
              }
              </div> : <img src = {image_placeholder} width="100%" alt="placeholder"/>}
          </div>
          <div class="column_images">
              <h2>Substantia Nigra (in red)</h2>
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

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

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
        })
        .catch((err) => {
            console.log("Error: " + err);
        })
    };

    return (
      <div className="main_container">
        <Header/>
        <div className="row">
          <div className="column_form">
              <form onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="image">Image: </label>
                  <input type="file" {...register("image", { required: true })} 
                      accept='.png, .jpg, .jpeg'
                      onChange={changeHandler} />
                  <br/>
                  <input className="button3" type="submit" />
                  <br/><br/><br/>
                  Chose an image of the midbrain and send it to the server.
                  <br/>
                  The artificial intelligence software will send back an image with the Substantia Nigra highlited in red (if it exists).
              </form>
          </div>
          <div className="column_images">
              <h2>Patient image</h2>
              {fileDataURL ?
              <div className="img-preview-wrapper">
              {
                  <img src={fileDataURL} width="100%" alt="preview" />
              }
              </div> : <img src = {image_placeholder} width="100%" alt="placeholder"/>}
          </div>
          <div className="column_images">
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

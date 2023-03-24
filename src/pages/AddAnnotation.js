import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import "./Prediction.css"
import {Header} from "../components/shared/Header/Header";

import image_placeholder from "../images/image_placeholder.png"
import { Footer } from "../components/shared/Footer/Footer";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function AddAnnotation() {

  console.log("AddAnnotation")

    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [fileDataURL2, setFileDataURL2] = useState(null);
    const [responseAPI, setResponseAPI] = useState(null);

    const [fields, setFields] = useState({
        image: null,
        annotation : null,
        title: "",
        description: "",
        patient_id: "",
        patient_age: "",
        sn_right: 0,
        sn_left: 0,
        birth_date: null,
        visit_date: null,
        sex: null,
        user_id: 1}); // TODO HARDCODED

    const { register, handleSubmit, formState: { errors } } = useForm();

    const changeHandler = (e, fnum) => {
        if (fnum === "image1" ) {
        const file = e.target.files[0];
        console.log(e.target.files)
        if (!file.type.match(imageMimeType)) {
          alert("Image mime type is not valid");
          return;
        }
        setFile(file);
      }
      if (fnum === "image2") {
        const file2 = e.target.files[0];
        if (!file2.type.match(imageMimeType)) {
          alert("Image mime type is not valid");
          return;
        }
        setFile2(file2);
      }
    }
      useEffect(() => {
        let fileReader, isCancel = false;
        let fileReader2, isCancel2 = false;
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
        if (file2) {
          fileReader2 = new FileReader();
          fileReader2.onload = (e) => {
            const { result } = e.target;
            if (result && !isCancel2) {
              setFileDataURL2(result)
            }
          }
          fileReader2.readAsDataURL(file2);
        }
        return () => {
          isCancel = true;
          isCancel2 = true;
          if (fileReader && fileReader.readyState === 1) {
            fileReader.abort();
          }
          if (fileReader2 && fileReader2.readyState === 1) {
            fileReader2.abort();
          }
        }
    
  }, [file, file2]);
    



    function onSubmit (data) {
        console.log("Data:", data)
        console.log("Data.image[0]:", data.image[0])

        const formData = new FormData()
        formData.append("image_sample", data.image[0])
        formData.append("image_ground_truth", data.annotation[0])
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("patient_id", data.patient_id);
        // formData.append("patient_age", data.patient_age);
        formData.append("sn_right", data.sn_right)
        formData.append("sn_left", data.sn_left)
        formData.append("sex", data.sex)
        formData.append("birth_date", data.birth_date)
        formData.append("user_id", data.user_id);

        console.log("formData:", formData)

        axios
        .post(
            "http://[::1]:8438/prediction/do-ground-truth/",
            formData,
            {
                headers: {
                    "Content-type": "multipart/form-data",
                },
                responseType: "arraybuffer", // TODO useless?
            }
        )
        .then((res) => {
          setResponseAPI("Request was succefull.")
          alert("Request was succefull.");
        })
        .catch((err) => {
          setResponseAPI("Request ERROR.")
          alert("Request ERROR.");
            console.log("Error: " + err);
        })
    };

    return (
      <div>
        <Header/>
        <div className="row">
          <div className="column_form">
              <form onSubmit={handleSubmit(onSubmit)}>
                  <label for="image">Patient's Image: </label>
                  <input type="file" {...register("image", { required: true })} 
                      accept='.png, .jpg, .jpeg'
                      onChange={(e)=>changeHandler(e, "image1")} />
                  <label for="annotation">Annotation image: </label>
                  <input type="file" {...register("annotation", { required: true })} 
                      accept='.png, .jpg, .jpeg'
                      onChange={(e)=>changeHandler(e, "image2")} />
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
                  <label for="visit_date">Visit Date</label>
                  <br/>
                  <input type="date" id="visit_date" name="visit_date" {...register("visit_date", { required: true })}/>
                  <br/>
                  <label for="birth_date">Birth Date</label>
                  <input type="date" id="birth_date" name="birth_date" {...register("birth_date", { required: true })}/>
                  <br/>
                  <label for="sn_right">SN Right</label>
                  <input type="number" id="sn_right" name="sn_right" min="0" {...register("sn_right", { required: true })}/>
                  <br/>
                  <label for="sn_left">SN Left</label>
                  <input type="number" id="sn_left" name="sn_left" min="0" {...register("sn_left", { required: true })}/>
                  <br/>
                  <label for="sex">Sex</label>
                  <select id="sex" name="sex" {...register("sex", { required: true })}>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                  <br/><br/>
                  {(errors.title ||  errors.patient_id || errors.sex || errors.sn_left ||
                  errors.sn_right || errors.birth_date || errors.visit_date || errors.image ||
                  errors.annotation) 
                  && <span><b>All fields are required</b></span>}
                  <br/><br/>
                  <input className="button3" type="submit" />
              </form>
          </div>
          <div className="column_images">
              <h2>Untraced Patient Image</h2>
              {fileDataURL ?
              <div className="img-preview-wrapper">
              {
                  <img src={fileDataURL} width="100%" alt="preview" />
              }
              </div> : <img src = {image_placeholder} width="100%" alt="placeholder"/>}
          </div>
          <div className="column_images">
              <h2>Ground Truth image</h2>
              {fileDataURL2 ?
              <div className="img-preview-wrapper">
              {
                  <img src={fileDataURL2} width="100%" alt="preview" />
              }
              </div> : <img src = {image_placeholder} width="100%" alt="placeholder"/>}
          </div>
        </div>
        { responseAPI?
          <div>
            {responseAPI}
          </div> : ""
        }
        <Footer/>
    </div>
  );
}

export default AddAnnotation;

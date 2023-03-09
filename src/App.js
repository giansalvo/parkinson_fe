import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
// import "./styles.css"
import "./App.css"
import logo_abinsula from './images/abinsula_logo.png';
import logo_uniss from './images/uniss_logo.png';
import logo_project from "./images/project_logo.svg"
import image_placeholder from "./images/image_placeholder.png"

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function App() {

    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);

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
            }
        )
        .then((res) => {
            console.log(`Success` + res);
           
        })
        .catch((err) => {
            console.log("Error: " + err);
        })
    };

    return (
      <>
        <header className="header">
            <img src = {logo_project} height="75" alt="project logo"/>
          Parkinson's Project
        </header>
        <div class="row">
            <div class="column">
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
            <div class="column">
                <h2>Column 2</h2>
                <p>Some text..</p>
                {fileDataURL ?
                <p className="img-preview-wrapper">
                {
                    <img src={fileDataURL} alt="preview" />
                }
                </p> : <img src = {image_placeholder} width="100%" alt="placeholder"/>}
            </div>
            <div class="column">
                <h2>Column 3</h2>
                <p>Some text..</p>
                <img src = {image_placeholder} width="100%" alt="placeholder"/>
            </div>
        </div>
        <footer className="footer">
            <img src={logo_uniss} height="75" alt="UNISS logo"/>
            <img src={logo_abinsula} height="75" alt="Abinsula logo"/>
        </footer> 
    </>
  );
}

export default App;
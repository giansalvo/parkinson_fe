import React from "react";
import { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import request from "../utils/request";
import { useForm } from "react-hook-form";
import styled from 'styled-components'
import { useTranslation} from 'react-i18next';


import "./Prediction.css"
import {Header} from "../components/shared/Header/Header";

import image_placeholder from "../images/image_placeholder.png"
import { Footer } from "../components/shared/Footer/Footer";
import SignIn from "./SignIn"
import {GetItem} from "../utils/storage";

const imageMimeType = /image\/(png|jpg|jpeg)/i;
const Styles = styled.div`
  .input {
    font-size: 14px;
    font-size: max(16px, 1em);
    font-family: inherit;
    padding:10px;
    margin:10px;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 4px;
  }
  .input:not(textarea) {
    line-height: 1;
    height: 2.25rem;
  }
`

export const postAnnotationAPI = (url_param, formData) => {
  return request(
    {
      data: formData,
      url: url_param,
      method: 'POST',
      responseType: "arraybuffer",
    },
    false,
    true
  );
}

function AddAnnotation() {

    console.log("AddAnnotation")

    const { t } = useTranslation();

    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [fileDataURL2, setFileDataURL2] = useState(null);
    const [responseAPI, setResponseAPI] = useState(null);
    
    const isLoggedIn = Boolean(GetItem("logged_in"))

    const [fields, setFields] = useState({
        image: null,
        annotation : null,
        notes: "",
        patient_id: "",
        age_onset: "",
        sn_right: 0,
        sn_left: 0,
        birth_date: null,
        visit_date: null,
        sex: null,
        user_id: 1}); // TODO HARDCODED

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

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
        formData.append("notes", data.notes);
        formData.append("patient_id", data.patient_id);
        formData.append("age_onset", data.age_onset);
        formData.append("sn_right", data.sn_right)
        formData.append("sn_left", data.sn_left)
        formData.append("sex", data.sex)
        formData.append("visit_date", data.visit_date)
        formData.append("birth_date", data.birth_date)
        formData.append("user_id", data.user_id);

        console.log("formData:", formData)

        const url = "http://[::1]:8438/prediction/do-ground-truth/"
        postAnnotationAPI(url, formData).then ( result => {
            setResponseAPI("Request was succefull.");
            alert("Request was succefull.");
            setValue("image", "");
            setValue("annotation", "");
            setValue('notes', '');
            setValue('user_id', '');
            setValue('patient_id', '');
            setValue("visit_date", '');
            setValue("birth_date", "");
            setValue("age_onset", "");
            setValue("sex", "A");
            setValue("sn_right", "");
            setValue("sn_left", "");
            }
        ) .catch (error => 
          console.log("error: ", error)
        )
    };

    return (
      <>
      {!isLoggedIn ? 
            <Redirect to="SignIn"/> 
      :
      <div>
        <Header/>
        <div className="row">
          <div className="column_form">
              <form onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="image">{t('add_annotation.p1')} </label>
                  <input type="file" {...register("image", { required: true })} 
                      accept='.png, .jpg, .jpeg'
                      onChange={(e)=>changeHandler(e, "image1")} />
                  <label htmlFor="annotation">{t('add_annotation.p2')}</label>
                  <input type="file" {...register("annotation", { required: true })} 
                      accept='.png, .jpg, .jpeg'
                      onChange={(e)=>changeHandler(e, "image2")} />
                  <br/>
                  <input {...register("user_id", { required: true })} placeholder={t('add_annotation.p5')} autoComplete="off"/>
                  <br/>
                  <input type="text" {...register("patient_id", { required: true })} placeholder={t('add_annotation.p6')} autoComplete="off"/>
                  <br/>
                  <label htmlFor="visit_date">{t('add_annotation.p7')}</label>
                  <br/>
                  <input type="date" id="visit_date" name="visit_date" {...register("visit_date", { required: true })}/>
                  <br/>
                  <input type="number" step="any" id="age_onset" name="age_onset" min="0" {...register("age_onset", { required: true })} placeholder={t('add_annotation.p8')}/>
                  <br/>
                  <label htmlFor="birth_date">{t('add_annotation.p9')}</label>
                  <br/>
                  <input type="date" id="birth_date" name="birth_date" {...register("birth_date", { required: true })} />
                  <br/>
                  <input type="number" step="any" id="sn_right" name="sn_right" min="0" {...register("sn_right", { required: true })}placeholder={t('add_annotation.p10')}/>
                  <br/>
                  <input type="number" step="any" id="sn_left" name="sn_left" min="0" {...register("sn_left", { required: true })} placeholder={t('add_annotation.p11')}/>
                  <br/>
                  <input type="text" {...register("notes", { required: false })} placeholder={t('add_annotation.p4')} autoComplete="off"/>
                  <br/>
                  <label htmlFor="sex">{t('add_annotation.p12')}</label>
                  <select id="sex" name="sex" {...register("sex", { required: true })}>
                    <option value="M">{t('add_annotation.p13')}</option>
                    <option value="F">{t('add_annotation.p14')}</option>
                  </select>
                  <br/><br/>
                  {(errors.title ||  errors.patient_id || errors.sex || errors.sn_left ||
                  errors.sn_right || errors.birth_date || errors.visit_date || errors.image ||
                  errors.annotation) 
                  && <span><b>{t('add_annotation.p15')}</b></span>}
                  <br/><br/>
                  <input className="button3" type="submit" />
              </form>
          </div>
          <div className="column_images">
              <h2>{t('add_annotation.p16')}</h2>
              {fileDataURL ?
              <div className="img-preview-wrapper">
              {
                  <img src={fileDataURL} width="100%" alt="preview" />
              }
              </div> : <img src = {image_placeholder} width="100%" alt="placeholder"/>}
          </div>
          <div className="column_images">
              <h2>{t('add_annotation.p17')}</h2>
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
    }
    </>
  );
}

export default AddAnnotation;

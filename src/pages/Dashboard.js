import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import "./Dashboard.css"
import { Header } from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

function Dashboard() {

  console.log("Dashboard")

  const [fields, setFields] = useState({
    sex: "",
    sn_left_min: "",
    sn_left_max: "",
    sn_right_min: "",
    sn_right_max: "",
    birth_from: "",
    birth_to: "",
    visit_from: "",
    visit_to: ""});

  const [content, setContent] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit (data) {
    console.log("Data:", data)
  
    let param = ""
    let started = false
    if (data.sex) {
      if (started) {
        param = param + "&"
      }
      param = param + "sex=" + data.sex;
      started = true
    }
    if (data.sn_left_min) {
      if (started) {
        param = param + "&"
      }
      param = param + "sn_left_min=" + data.sn_left_min;
      started = true
    }
    if (data.sn_left_max) {
      if (started) {
        param = param + "&"
      }
      param = param + "sn_left_max=" + data.sn_left_max;
      started = true
    }
    if (data.sn_right_min) {
      if (started) {
        param = param + "&"
      }
      param = param + "sn_right_min=" + data.sn_right_min;
      started = true
    }
    if (data.sn_right_max) {
      if (started) {
        param = param + "&"
      }
      param = param + "sn_right_max=" + data.sn_right_max;
      started = true
    }
    if (data.visit_from) {
      if (started) {
        param = param + "&"
      }
      param = param + "visit_from=" + data.visit_from;
      started = true
    }
    if (data.visit_to) {
      if (started) {
        param = param + "&"
      }
      param = param + "visit_to=" + data.visit_to;
      started = true
    }
    if (data.birth_from) {
      if (started) {
        param = param + "&"
      }
      param = param + "birth_from=" + data.birth_from;
      started = true
    }
    if (data.birth_to) {
      if (started) {
        param = param + "&"
      }
      param = param + "birth_to=" + data.birth_to;
      started = true
    }
 
    if (param) {
      param = "?"+param
    }

    console.log("param:"+param)

    const url = "https://backend.parkinson.development.abidevops.website/prediction/do-dashboard/" + param
    console.log(url)

    axios
    .get(url,
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
        // var lenght = Object.keys(obj.data.predictions).length;
        // console.log("lenght " + lenght)
        var pObj = obj.data.predictions;
        setContent(pObj);
    })
    .catch((err) => {
        alert("Error during request.")      
        console.log("Error: " + err);
    })
  };

  return (
    <div className="main_container">
      <Header/>
      <form  onSubmit={handleSubmit(onSubmit)}>
      <div className="row_dashboard">
        <div className="column_dashboard">
          Date of Visit
          <br/>
          <label htmlFor="visit_from">From:</label>
          <input type="date" id="visit_from" name="visit_from" {...register("visit_from")}/>
          <label htmlFor="visit_to">To:</label>
          <input type="date" id="visit_to" name="visit_to" {...register("visit_to")}/>
          <br/><br/>
          Date of birth
          <br/>
          <label htmlFor="birth_from">From:</label>
          <input type="date" id="birth_from" name="birth_from" {...register("birth_from")}/>
          <label htmlFor="birth_to">To:</label>
          <input type="date" id="birth_to" name="birth_to" {...register("birth_to")}
          /><br/><br/>
          <label htmlFor="sex">Sex:</label>
          <select name="sex" id="sex" {...register("sex")}>
            <option value='A'>All</option>
            <option value='M'>Male</option>
            <option value='F'>Female</option>
          </select><br/><br/>
          </div>
        <div className="column_dashboard">
           SN Right<br/>
          <label htmlFor="sn_right_min">min</label>
          <input type="number" id="sn_right_min" name="sn_right_min" min="0" {...register("sn_right_min")}/>
          <label htmlFor="sn_right_max">max</label>
          <input type="number" id="sn_right_max" name="sn_right_max" min="0" {...register("sn_right_max")}/>
          <br/><br/>
          SN Left<br/>
          <label htmlFor="sn_left_min">min</label>
          <input type="number" id="sn_left_min" name="sn_left_min" min="0" {...register("sn_left_min")}/>
          <label htmlFor="sn_left_max">max</label>
          <input type="number" id="sn_left_max" name="sn_left_max" min="0" {...register("sn_left_max")}/>
          </div>
          </div>
          
          {errors.visit_from       && <span>This field is required</span>}
          {errors.sn_left_min       && <span>This field is required</span>}

          <input className="button3" type="submit"/>
          <input className="button3" type="reset"/>  {/* *** TODO **** */}
          
        </form>
        {/* *** TABLE **** */}
        <div>
        <table className="fixed_header">
            <thead>
            <tr>
              <th>id</th>
              <th>patient_id</th>
              <th>age</th>  
              <th>Sex</th>  
              <th>Date of Birth</th> 
              <th>Date of Visit</th> 
              <th>SN right</th>
              <th>SN left</th>
              <th>Notes</th>
              <th>User Name</th>
            </tr>
            </thead>
            <tbody >
              {content && content.map((record)=>(
                <tr key = {record.id}>
                <td>
                  {record.id}
                </td>

                <td>
                  {record.patient_id}
                </td>
                <td>
                    {record.patient_age}
                </td>
                <td>
                    {record.sex}
                </td>
                <td>
                    { record.birth_date}
                </td>
                <td>
                    { record.visit_date}
                </td>
                <td>
                    {record.sn_right}
                </td>
                <td>
                    {record.sn_left}
                </td>
                <td>
                    {record.notes}
                </td>
                <td>
                    TODO
                    {/* {record.user name!!!} */}
                </td>  
                </tr>
              ))}
            </tbody>
        </table>
        </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;

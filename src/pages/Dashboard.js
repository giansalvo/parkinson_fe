import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Dashboard.css"
import { Header } from "../components/shared/Header/Header";
import { Footer } from "../components/shared/Footer/Footer";

function Dashboard() {

  console.log("Dashboard")

  const [fields, setFields] = useState({
    sex: "",
    sn_left_min: 0,
    sn_left_max: 999,
    sn_right_min: 0,
    sn_right_max: 999,
    sn_right_min: 0,
    birth_from: null,
    birth_to: null});

  const [content, setContent] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit (data) {
    console.log("Data:", data)

    const formData = new FormData()
    formData.append("sex", 'F');
    formData.append("sn_left_min", data.sn_left_min);
    formData.append("sn_left_max", data.sn_left_max);
    formData.append("sn_right_min", data.sn_right_min);
    formData.append("sn_right_max", data.sn_right_max);
    formData.append("visit_from", data.visit_from);
    formData.append("visit_to", data.visit_to);
    formData.append("birth_from", data.birth_from);
    formData.append("birth_to", data.birth_to);

    console.log("formData:", formData)
    console.log("sex: " + data.sex + " " + formData.get("sex"));

    axios
    .get(
        "http://[::1]:8438/prediction/do-dashboard/",
        formData,
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
    <div class="main_container">
      <Header/>
      <form  onSubmit={handleSubmit(onSubmit)}>
      <div class="row_dashboard">
        <div class="column_dashboard">
          Date of Visit
          <label for="visit_from">From:</label>
          <input type="date" id="visit_from" name="visit_from" {...register("visit_from", { required: true })}/>
          <label for="visit_to">To:</label>
          <input type="date" id="visit_to" name="visit_to" {...register("visit_to", { required: true })}/>
          <br/><br/>
          Date of birth
          <label for="birth_from">From:</label>
          <input type="date" id="birth_from" name="birth_from" {...register("birth_from", { required: true })}/>
          <label for="birth_to">To:</label>
          <input type="date" id="birth_to" name="birth_to" {...register("birth_to", { required: true })}
          /><br/><br/>
          <label for="sex">Sex:</label>
          <select name="sex" id="sex" {...register("sex", { required: true })}>
            <option value='A'>All</option>
            <option value='M'>Male</option>
            <option value='F'>Female</option>
          </select><br/><br/>
          </div>
        <div class="column_dashboard">
              SN Right
          <label for="sn_right_min">min</label>
          <input type="number" id="sn_right_min" name="sn_right_min" min="0" {...register("sn_right_min", { required: true })}/>
          <label for="sn_right_max">max</label>
          <input type="number" id="sn_right_max" name="sn_right_max" min="0" {...register("sn_right_max", { required: true })}/>
          <br/><br/>
          SN Left
          <label for="sn_left_min">min</label>
          <input type="number" id="sn_left_min" name="sn_left_min" min="0" {...register("sn_left_min", { required: true })}/>
          <label for="sn_left_max">max</label>
          <input type="number" id="sn_left_max" name="sn_left_max" min="0" {...register("sn_left_max", { required: true })}/>
          </div>
          </div>
          
          {errors.visit_from       && <span>This field is required</span>}
          {errors.sn_left_min       && <span>This field is required</span>}

          <input type="submit" />
          
        </form>
        {/* *** TABLE 1 **** */}
        <h2>Click the button to get data</h2>
        <div class="FixedHeightContainer">
        <table>
            <theader>
              <th>id</th>
              <th>patient_id</th>
              <th>title</th>
              <th>description</th>
              <th>age</th>  
              <th>Sex</th>  
              <th>Date of Visit</th>                                          
              <th>SN right</th>
              <th>SN left</th>
              <th>User Name</th>
            </theader>
            <tbody >
              {content && content.map((record)=>(
                <tr>
                <td>
                  {record.id}
                </td>

                <td>
                  {record.patient_id}
                </td>
                <td>
                    {record.title}
                </td>
                <td>
                    {record.description}
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

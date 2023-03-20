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

  const [content, setContent] = useState(null)
  const { handleSubmit, formState: { errors } } = useForm();

  function onSubmit (data) {
    console.log("Data:", data)

    axios
    .get(
        "http://[::1]:8438/prediction/do-dashboard/",
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
    <div class="main_container">
      <Header/>
      
      <form onSubmit={handleSubmit(onSubmit)}>
          Date of Visit
          <label for="visit_from">From:</label>
          <input type="date" id="visit_from" name="visit_from"/>
          <label for="visit_to">To:</label>
          <input type="date" id="visit_to" name="visit_to"/><br/><br/>
          Date of birth
          <label for="birth_from">From:</label>
          <input type="date" id="birth_from" name="birth_from"/>
          <label for="birth_to">To:</label>
          <input type="date" id="birth_to" name="birth_to"/><br/><br/>
          <label for="sex">Sex:</label>
          <select name="sex" id="sex">
          <option value="A">All</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select><br/><br/>
              SN Right
          <label for="sn_right_min">min</label>
          <input type="number" id="sn_right_min" name="sn_right_min"/>
          <label for="sn_right_max">max</label>
          <input type="number" id="sn_right_max" name="sn_right_max"/>
          <br/><br/>
          SN Left
          <label for="sn_left_min">min</label>
          <input type="number" id="sn_left_min" name="sn_left_min"/>
          <label for="sn_left_max">max</label>
          <input type="number" id="sn_left_max" name="sn_left_max"/>
          <br/><br/>
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
                    {/* {record.visit_date} */}
                </td>
                <td>
                    {/* {record.sex} */}
                </td>
                <td>
                    {/* {record.sn_right} */}
                </td>
                <td>
                    {/* {record.sn_left} */}
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

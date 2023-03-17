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
          <input type="submit" />
        </form>
        {/* *** TABLE 1 **** */}
        <h2>Click the button to get data</h2>
        <table>
            <theader>
              <th>id</th>
              <th>patient_id</th>
              <th>title</th>
              <th>description</th>
              <th>age</th>              
            </theader>
            <tbody>
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
                </tr>
              ))}
            </tbody>
        </table>
      <Footer/>
    </div>
  );
}

export default Dashboard;

import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import { HomePage } from "./HomePage";


export default function SignOut() {
  
  
  localStorage.setItem("logged_in", JSON.stringify(false))
  

  return (
    <Redirect to="HomePage"/>
  );
}
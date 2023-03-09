import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
    <p
      style={{
        marginTop: "100px",
        marginBottom: "50px",
        textAlign: "center",
        width: "100%",
        fontWeight: "bold"
      }}
    >
    </p>
  </React.StrictMode>,
  rootElement
);

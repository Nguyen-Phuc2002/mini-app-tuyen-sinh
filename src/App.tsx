import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import "./styles/app.scss";
import "./styles/tailwind.scss";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;

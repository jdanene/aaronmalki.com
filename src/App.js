import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {TopNavBar} from "./components/NavBar";

function App() {
  return (
    <div className="app_container">
      <TopNavBar/>

      <div className={"app_container_main_body"}>
        jndklfmnrjlknfr
      </div>

    </div>
  );
}

export default App;

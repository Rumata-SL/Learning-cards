import './App.css';
import React from 'react';
import {PATH} from "../common/enum/path";
// import {Nav} from "./components/nav/Nav";
import {Login} from "../feautures/login/Login";
import {Navbar} from "../feautures/nav/Navbar";
import {Profile} from "../feautures/profile/Profile";
import {Test} from "../components/testComponent/Test";
import {Recovery} from "../feautures/recovery/Recovery";
import {Navigate, Route, Routes} from "react-router-dom";
import {NewPassword} from "../feautures/newPassword/NewPassword";
import {Registration} from "../feautures/registration/Registration";
import {ErrorComponent} from "../feautures/errorFolder/ErrorComponent";
import {Pages} from "./Pages";

function App() {
  return (
    <div className="app">
        <Navbar/>
        {/*<Nav/>*/}
        <div className="app-wrapper">
            <Pages/>
        </div>
    </div>
  );
}

export default App;

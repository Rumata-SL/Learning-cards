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

function App() {
  return (
    <div className="app">
        <Navbar/>
        {/*<Nav/>*/}
        <div className="app-wrapper">
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.PROFILE}/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}></Route>
                <Route path={PATH.REGISTRATION} element={<Registration/>}></Route>
                <Route path={PATH.LOGIN} element={<Login/>}></Route>
                <Route path={PATH.RECOVERY} element={<Recovery/>}></Route>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}></Route>
                <Route path={PATH.TEST} element={<Test/>}></Route>
                <Route path={"/*"} element={<ErrorComponent/>}></Route>
            </Routes>
        </div>
    </div>
  );
}

export default App;

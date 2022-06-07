import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Header} from "./components/header/Header";
import {Navigate} from "./components/nav/Navigate";
import {Route, Routes} from "react-router-dom";
import {Profile} from "./components/profile/Profile";
import {Registration} from "./components/registration/Registration";
import {Login} from "./components/login/Login";
import {ErrorComponent} from "./components/errorFolder/ErrorComponent";
import {Recovery} from "./components/recovery/Recovery";
import {Test} from "./components/testComponent/Test";
import {NewPassword} from "./components/newPassword/NewPassword";

function App() {
  return (
    <div className="app">
        <Header/>
        <Navigate/>
        <div className="app-wrapper">
            <Routes>
                <Route path={"/profile"} element={<Profile/>}></Route>
                <Route path={"/registration"} element={<Registration/>}></Route>
                <Route path={"/login"} element={<Login/>}></Route>
                <Route path={"/recovery"} element={<Recovery/>}></Route>
                <Route path={"/test"} element={<Test/>}></Route>
                <Route path={"/new_password"} element={<NewPassword/>}></Route>
                <Route path={"/error"} element={<ErrorComponent/>}></Route>
            </Routes>
        </div>
    </div>
  );
}

export default App;

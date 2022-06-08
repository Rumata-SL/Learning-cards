import './App.css';
import React from 'react';
import {Nav} from "./components/nav/Nav";
import {Login} from "./components/login/Login";
import { Route, Routes} from "react-router-dom";
import {Header} from "./components/header/Header";
import {Profile} from "./components/profile/Profile";
import {Test} from "./components/testComponent/Test";
import {Recovery} from "./components/recovery/Recovery";
import {NewPassword} from "./components/newPassword/NewPassword";
import {Registration} from "./components/registration/Registration";
import {ErrorComponent} from "./components/errorFolder/ErrorComponent";

function App() {
  return (
    <div className="app">
        <Header/>
        <Nav/>
        <div className="app-wrapper">
            <Routes>
                <Route path={"/profile"} element={<Profile/>}></Route>
                <Route path={"/registration"} element={<Registration/>}></Route>
                <Route path={"/login"} element={<Login/>}></Route>
                <Route path={"/recovery"} element={<Recovery/>}></Route>
                <Route path={"/new_password"} element={<NewPassword/>}></Route>
                <Route path={"/test"} element={<Test/>}></Route>
                <Route path={"/error"} element={<ErrorComponent/>}></Route>
            </Routes>
        </div>
    </div>
  );
}

export default App;

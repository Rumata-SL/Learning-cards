import './App.css';
import React from 'react';
import {PATH} from "./enum/path";
// import {Nav} from "./components/nav/Nav";
import {Login} from "./components/login/Login";
import {Header} from "./components/header/Header";
import {Profile} from "./components/profile/Profile";
import {Test} from "./components/testComponent/Test";
import {Recovery} from "./components/recovery/Recovery";
import {Navigate, Route, Routes} from "react-router-dom";
import {NewPassword} from "./components/newPassword/NewPassword";
import {Registration} from "./components/registration/Registration";
import {ErrorComponent} from "./components/errorFolder/ErrorComponent";

function App() {
  return (
    <div className="app">
        <Header/>
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

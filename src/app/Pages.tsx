import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {PATH} from "../common/enum/path";
import {Profile} from "../feautures/profile/Profile";
import {Registration} from "../feautures/registration/Registration";
import {Login} from "../feautures/login/Login";
import {Recovery} from "../feautures/recovery/Recovery";
import {NewPassword} from "../feautures/newPassword/NewPassword";
import {Test} from "../components/testComponent/Test";
import {ErrorComponent} from "../feautures/errorFolder/ErrorComponent";

export const Pages = () => {
    return (
        <div>
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
    );
};

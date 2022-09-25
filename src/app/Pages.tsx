import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {PATH} from "../common/enum/path";
import {Profile} from "../features/profile/Profile";
import {Registration} from "../features/registration/Registration";
import {Login} from "../features/login/Login";
import {Recovery} from "../features/recovery/Recovery";
import {NewPassword} from "../features/newPassword/NewPassword";
import {Test} from "../components/testComponent/Test";
import {ErrorComponent} from "../features/errorFolder/ErrorComponent";

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

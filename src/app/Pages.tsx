import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {PATH} from "../common/enum/path";
import {Profile} from "../features/profile/Profile";
import {Registration} from "../features/auth/registration/Registration";
import {Login} from "../features/auth/login/Login";
import {Recovery} from "../features/auth/recovery/Recovery";
import {NewPassword} from "../features/auth/newPassword/NewPassword";
import {ErrorComponent} from "../common/components/errorFolder/ErrorComponent";
import {PacksList} from "../features/packsList/PacksList";
import {Pack} from "../features/packsList/pack/Pack";

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
                <Route path={PATH.PACKS_LIST} element={<PacksList/>}></Route>
                <Route path={PATH.PACK} element={<Pack/>}></Route>
                <Route path={"/*"} element={<ErrorComponent/>}></Route>
            </Routes>
        </div>
    );
};

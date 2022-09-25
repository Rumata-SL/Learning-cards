import React from "react";
import h from "./Navbar.module.css"
import {NavLink} from "react-router-dom";
import {PATH} from "../../common/enum/path";

type IsActive = {
    isActive: boolean
}

export const Navbar = () => {
    const setActive = ({isActive}: IsActive) => isActive ? h.active : h.link
    return (
        <div className={h.wrapper}>
            <div className={h.container}>
                <div><NavLink className={setActive} to={PATH.PROFILE}>Profile</NavLink></div>
                <div><NavLink className={setActive} to={PATH.REGISTRATION}>Registration</NavLink></div>
                <div><NavLink className={setActive} to={PATH.LOGIN}>Login</NavLink></div>
                <div><NavLink className={setActive} to={PATH.RECOVERY}>Recovery</NavLink></div>
                <div><NavLink className={setActive} to={PATH.NEW_PASSWORD}>New password</NavLink></div>
            </div>
        </div>
    );
};

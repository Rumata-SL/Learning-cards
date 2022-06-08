import React from "react";
import n from "./Nav.module.css"
import {PATH} from "../../enum/path";
import {NavLink} from "react-router-dom";

type IsActive = {
    isActive: boolean
}

export const Nav = () => {
    const setActive = ({isActive}: IsActive) => isActive ? n.active : n.link
    return (
        <div className={n.wrapper}>
            <div className={n.container}>
                <div><NavLink className={setActive} to={PATH.PROFILE}>Profile</NavLink></div>
                <div><NavLink className={setActive} to={PATH.REGISTRATION}>Registration</NavLink></div>
                <div><NavLink className={setActive} to={PATH.LOGIN}>Login</NavLink></div>
                <div><NavLink className={setActive} to={PATH.RECOVERY}>Recovery</NavLink></div>
                <div><NavLink className={setActive} to={PATH.NEW_PASSWORD}>New password</NavLink></div>
                <div><NavLink className={setActive} to={PATH.TEST}>Test</NavLink></div>
                {/*<div><NavLink className={setActive} to={"error"}>Error</NavLink></div>*/}
            </div>
        </div>
    );
};

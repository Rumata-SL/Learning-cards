import React from "react";
import h from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {PATH} from "../../enum/path";

type IsActive = {
    isActive: boolean
}

export const Header = () => {
    const setActive = ({isActive}: IsActive) => isActive ? h.active : h.link
    return (
        <div className={h.wrapper}>
            {/*<div>HOME WORK 14</div>*/}
            <div className={h.container}>
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

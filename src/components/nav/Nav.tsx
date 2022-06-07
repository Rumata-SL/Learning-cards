import React from "react";
import n from "./Nav.module.css"
import {NavLink} from "react-router-dom";



export const Nav = () => {
    // const setActive = ({ isActive }:any) =>isActive ? n.active : n.link
    const setActive = ({isActive}: any) => isActive ? n.active : n.link
    return (
        <div className={n.wrapper}>
            <div className={n.container}>
                <div><NavLink className={setActive} to={"profile"}>Profile</NavLink></div>
                <div><NavLink className={setActive} to={"registration"}>Registration</NavLink></div>
                <div><NavLink className={setActive} to={"login"}>Login</NavLink></div>
                <div><NavLink className={setActive} to={"recovery"}>Recovery</NavLink></div>
                <div><NavLink className={setActive} to={"new_password"}>New password</NavLink></div>
                <div><NavLink className={setActive} to={"test"}>Test</NavLink></div>
                <div><NavLink className={setActive} to={"error"}>Error</NavLink></div>
            </div>
        </div>
    );
};

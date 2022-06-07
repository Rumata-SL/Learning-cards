import React from "react";
import n from "./Navigate.module.css"
import {NavLink} from "react-router-dom";


export const Navigate = () => {
    // const setActive = ({ isActive }:any) =>isActive ? n.active : n.link
    const setActive = ({isActive}: any) => isActive ? n.active : n.link
    return (
        <div className={n.wrapper}>
            <div className={n.container}>
                <div><NavLink className={setActive} to={"profile"}>profile</NavLink></div>
                <div><NavLink className={setActive} to={"registration"}>registration</NavLink></div>
                <div><NavLink className={setActive} to={"login"}>login</NavLink></div>
                <div><NavLink className={setActive} to={"recovery"}>recovery</NavLink></div>
                <div><NavLink className={setActive} to={"test"}>test</NavLink></div>
                <div><NavLink className={setActive} to={"new_password"}>new password</NavLink></div>
                <div><NavLink className={setActive} to={"error"}>error</NavLink></div>
            </div>
        </div>
    );
};

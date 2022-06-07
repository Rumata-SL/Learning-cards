import React from "react";
import t from "./Test.module.css"
import {SuperInput} from "./superComponents/superInput/SuperInput";
import SuperButton from "./superComponents/superButton/SuperButton";
import {SuperCheckBox} from "./superComponents/superCheckBox/SuperCheckBox";


export const Test = () => {
    return (
        <div className={t.wrapper}>
            <h4>TEST</h4>
            <div className={t.container}>
                <SuperInput placeholder={"text"}/>
                <SuperInput placeholder={"text"}/>
                <SuperCheckBox/>
                <SuperButton>BUTTON</SuperButton>
            </div>
        </div>
    );
};


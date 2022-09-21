import React, {FC, useCallback, useState} from "react";
import style from "./Registration.module.css"
import {
    // Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel
} from "@mui/material";
import {useFormik} from "formik";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Link, Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {registerTC} from "./registrationReducer";
import SuperButton
    from "../../components/testComponent/superComponents/superButton/SuperButton";
// import {RegisterParamsType} from "../../api/registerAPI";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Registration: FC = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const isRegistered = useAppSelector(state => state.registration.isRegistered)

    const [valuePass, setValuePass] = useState({
        password: "",
        showPass: false
    })
    const [valuePassConfirm, setValuePassConfirm] = useState({
        passwordConfirm: "",
        showPassConfirm: false
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Enter email";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Enter password";
            } else if (values.password.length <= 7) {
                errors.password = "Password must be more than 7 characters..."
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = "Repeat  password";
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = "The password and confirmation password do not match"
            }
            return errors;

        },
        onSubmit: (values) => {
            dispatch(registerTC(values))
        },
    })

    const clickShowPass = useCallback(() => {
        setValuePass({
            ...valuePass,
            showPass: !valuePass.showPass
        })
    }, [valuePass])


    const clickShowConfirmPass = useCallback(() => {
        setValuePassConfirm({
            ...valuePassConfirm,
            showPassConfirm: !valuePassConfirm.showPassConfirm
        })
    }, [valuePassConfirm])

    const MouseDownPass = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    }


    if (isLoggedIn) {
        return <Navigate to={"/login"}/>
    }
    return (
        <div className={style.wrapper}>
            <form className={style.formContainer}
                  onSubmit={formik.handleSubmit}>
                <div className={style.title}>Sign UP</div>
                <FormControl variant="standard">
                    <InputLabel color="primary">Email</InputLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder={"Email"}
                        className={style.input}
                        color={"primary"}
                        {...formik.getFieldProps("email")}
                    />
                </FormControl>
                {formik.errors.email && formik.touched.email &&
                    <div
                        className={style.emailError}>{formik.errors.email}</div>}
                <FormControl variant="standard">
                    <InputLabel color={"primary"}>Password</InputLabel>
                    <Input
                        id="password"
                        type={valuePass.showPass ? "text" : "password"}
                        placeholder={"Password"}
                        className={style.input}
                        color={"primary"}
                        {...formik.getFieldProps("password")}
                        autoComplete="on"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={clickShowPass}
                                    onMouseDown={MouseDownPass}
                                    color={"primary"}
                                >
                                    {valuePass.showPass ? <VisibilityOff/> :
                                        <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {formik.errors.password && formik.touched.password &&
                    <div
                        className={style.passwordError}>{formik.errors.password}</div>}

                <FormControl variant="standard">
                    <InputLabel color={"primary"}>Confirm
                        password</InputLabel>
                    <Input
                        id="confirmPassword"
                        type={valuePassConfirm.showPassConfirm ? "text" : "password"}
                        placeholder={"Confirm password"}
                        className={style.input}
                        color={"primary"}
                        {...formik.getFieldProps("confirmPassword")}
                        autoComplete="on"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={clickShowConfirmPass}
                                    onMouseDown={MouseDownPass}
                                    color={"primary"}
                                >
                                    {valuePassConfirm.showPassConfirm ?
                                        <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                    <div
                        className={style.confirmPasswordError}>{formik.errors.confirmPassword}</div>}
                {/*<Button color={"primary"} variant={"contained"} type="submit">Sign Up</Button>*/}
                <SuperButton
                    style={{
                        fontFamily: "Montserrat",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "20px",
                        letterSpacing: "0.01em"
                    }}
                    type="submit">Sign Up</SuperButton>
                <span className={style.text}>Already have an account?</span>

                <Link className={style.link} to={"/login"}>Sign In</Link>

            </form>
        </div>
    );
};


import React, {useCallback, useState} from "react";
import style from "./Registration.module.css"
import {
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel
} from "@mui/material";
import {useFormik} from "formik";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {registerTC} from "./registrationReducer";
import SuperButton
    from "../../components/testComponent/superComponents/superButton/SuperButton";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Registration = () => {

    const dispatch = useAppDispatch()

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
            const error: FormikErrorType = {};
            if (!values.email) {
                error.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                error.email = 'Invalid email address';
            }
            if (!values.password) {
                error.password = 'Required';
            } else if (values.password.length <= 7) {
                error.password = 'Password must be more than 7 characters...'
            }
            if (!values.confirmPassword) {
                error.confirmPassword = 'Required';
            } else if (values.confirmPassword !== values.password) {
                error.confirmPassword = 'The password and confirmation password do not match'
            }
            return error;

        },
        onSubmit: (values) => {
                dispatch(registerTC())
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

    return (
        <div className={style.wrapper}>
            <form className={style.formContainer} onSubmit={formik.handleSubmit}>
                <div className={style.title}>Sign UP</div>
                <FormControl variant="standard">
                    <InputLabel color="secondary">Email</InputLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder={"Email"}
                        className={style.input}
                        color={"secondary"}
                        {...formik.getFieldProps("email")}
                    />
                </FormControl>
                {/*{formik.errors.email && formik.touched.email &&
                    <div className={error.error}>{formik.errors.email}</div>}*/}

                <FormControl variant="standard">
                    <InputLabel color={"secondary"}>Password</InputLabel>
                    <Input
                        id="password"
                        type={valuePass.showPass ? "text" : "password"}
                        placeholder={"Password"}
                        className={style.input}
                        color={"secondary"}
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
                {/*{formik.errors.password && formik.touched.password &&
                    <div className={error.error}>{formik.errors.password}</div>}*/}

                <FormControl variant="standard">
                    <InputLabel color={"secondary"}>Confirm
                        password</InputLabel>
                    <Input
                        id="confirmPassword"
                        type={valuePassConfirm.showPassConfirm ? "text" : "password"}
                        placeholder={"Confirm password"}
                        className={style.input}
                        color={"secondary"}
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
                {/*{formik.errors.confirmPassword && formik.touched.confirmPassword &&
                    <div className={error.error}>{formik.errors.confirmPassword}</div>}*/}
                <Button color={"primary"} variant={"contained"} type="submit">Sign Up</Button>
                {/*<SuperButton className={style.btn} title={"Sign Up"} type="submit"/>*/}
                Already have an account?

                <Link className={style.link} to={"/login"} >Sign In</Link>

            </form>

        </div>
    );
};


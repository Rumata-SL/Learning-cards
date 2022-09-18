import React from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {useFormik} from 'formik';
import {Link, Navigate} from 'react-router-dom';
import {loginTC} from './loginReducer';
import {Checkbox, FormControl, FormControlLabel, Input, InputLabel} from '@mui/material';
import styles from './Login.module.css';
import style from '../recovery/Recovery.module.css';
import SuperButton from '../../components/testComponent/superComponents/superButton/SuperButton';

type FormikErrorType = {
    email?: string,
    password?: string,
    rememberMe?: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Invalid password';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(loginTC(values.email, values.password, values.rememberMe))
            formik.resetForm()
        }
    })

    if (isLoggedIn) {
        return <Navigate to={'/profile/'}/>
    }

    return (
        <div className={styles.form}>
            <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
                <h2 className={styles.title}>Sign in</h2>
                <FormControl variant="standard">
                    <InputLabel color="primary">Email</InputLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder={'Email'}
                        color={'primary'}
                        className={style.input}
                        {...formik.getFieldProps('email')}
                    />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel color="primary">Password</InputLabel>
                    <Input
                        id="password"
                        type="password"
                        placeholder={'password'}
                        color={'primary'}
                        className={style.input}
                        {...formik.getFieldProps('password')}
                    />
                </FormControl>
                <FormControl>
                    <FormControlLabel className={styles.input} control={<Checkbox/>} label="Remember me" />
                </FormControl>
                <div className={styles.recover}>
                    <span>Forgot Password?</span>
                </div>
                <SuperButton
                    style={{fontFamily: 'Montserrat', fontStyle: "normal", fontWeight: 500, fontSize:"16px", lineHeight:"20px", letterSpacing:"0.01em"}}
                    type="submit">Sign in</SuperButton>
                <span className={styles.text}>Don't have an account?</span>

                <Link className={styles.link} to={"/registration"} >Sign Up</Link>
            </form>
        </div>
    );
};
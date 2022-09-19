import React, {useEffect, useState} from 'react';
import style from '../recovery/Recovery.module.css';
import {Button, FormControl, Input, InputLabel} from '@mui/material';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {useFormik} from 'formik';
import {BackToLogin} from './BackToLogin';
import {requestRecoveryTC, setRecoveryErrorAC} from './recoveryReducer';
import {recoverAPI} from '../../api/recoveryAPI';


type FormikErrorType = {
    email?: string
}


export const Recovery = () => {

    // useEffect(()=>{
    //     recoverAPI.requestLink('denisegorenko1@gmail.com')
    // }, [])

    const isRequested = useAppSelector<boolean>(state => state.recovery.isRequested)
    const error = useAppSelector<string | null>(state => state.recovery.error)


    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const error: FormikErrorType = {};

            if (!values.email) {
                error.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                error.email = 'Invalid email address';
            }
            return error;

        },
        onSubmit: (values) => {
            dispatch(requestRecoveryTC(values.email))
        },
    })


    if (isRequested) {
        return <BackToLogin/>
    }

    const onFocusHandle = () => {
        dispatch(setRecoveryErrorAC(null))
    }

    return (
        <div className={style.wrapper}>
            <form className={style.formContainer} onSubmit={formik.handleSubmit}>
                <div className={style.title}>Forgot your password?</div>

                <div className={style.instructionsText}>
                    Enter your email address and we will send you further instructions
                </div>


                <FormControl className={style.inputBlock} variant="standard">
                    <InputLabel color="secondary">Email</InputLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder={'Email'}
                        className={style.input}
                        color={'secondary'}
                        onFocus={onFocusHandle}
                        {...formik.getFieldProps('email')}
                    />
                    {error ? <div className={style.error}>{error}</div> : null}
                </FormControl>
                {/*{formik.errors.email && formik.touched.email &&
                    <div className={error.error}>{formik.errors.email}</div>}*/}


                <Button color={'primary'} variant={'contained'} type="submit">Send Instructions</Button>
                {/*<SuperButton className={style.btn} title={"Sign Up"} type="submit"/>*/}

                <div>
                    <div className={style.loginMessage}>Already have an account?</div>
                    <Link className={style.link} to={'/login'}>Try logging in</Link>
                </div>

            </form>

        </div>
    );
};

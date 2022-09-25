import React from 'react';
import {useFormik} from 'formik';
import {BackToLogin} from './BackToLogin';
import {Link, Navigate} from 'react-router-dom';
import style from './Recovery.module.css';
import {FormControl, Input, InputLabel} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {requestRecoveryTC, setRecoveryErrorAC} from './recoveryReducer';
import SuperButton from '../../../common/components/superButton/SuperButton';


type FormikErrorType = {
    email?: string
}


export const Recovery = () => {

    const isRequested = useAppSelector<boolean>(state => state.recovery.isRequested)
    // const error = useAppSelector<string | null>(state => state.recovery.error)
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

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

    if (isLoggedIn) {
        return <Navigate to={'/profile/'}/>
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
                    {formik.errors.email && formik.touched.email &&
                        <div className={style.error}>{formik.errors.email}</div>}
                </FormControl>

                {/*{error ? <div className={style.error}>{error}</div> : null}*/}

                {/*<Button color={'primary'} variant={'contained'} type="submit">Send Instructions</Button>*/}

                <SuperButton style={{
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '20px',
                    letterSpacing: '0.01em'
                }} type="submit">Send Instructions</SuperButton>


                <div>
                    <div className={style.loginMessage}>Already have an account?</div>
                    <Link className={style.link} to={'/login'}>Try logging in</Link>
                </div>

            </form>

        </div>
    );
};

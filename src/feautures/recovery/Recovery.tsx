import React, {useState} from 'react';
import style from '../recovery/Recovery.module.css';
import {Button, FormControl, Input, InputLabel} from '@mui/material';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {useFormik} from 'formik';
import {BackToLogin} from './BackToLogin';


type FormikErrorType = {
    email?: string
}


export const Recovery = () => {


    const [isRequested, setIsRequested] = useState(false)


    const dispatch = useAppDispatch()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
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

        },
    })


    if(isRequested) {
        return <BackToLogin/>
    }

    return (
        <div className={style.wrapper}>
            <form className={style.formContainer} onSubmit={formik.handleSubmit}>
                <div className={style.title}>Forgot your password?</div>

                <div className={style.instructionsText}>
                    Enter your email address and we will send you further instructions
                </div>

                <FormControl variant="standard">
                    <InputLabel color="secondary">Email</InputLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder={'Email'}
                        className={style.input}
                        color={'secondary'}
                        {...formik.getFieldProps('email')}
                    />
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

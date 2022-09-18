import React, {useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {useFormik} from 'formik';
import {registerTC} from '../registration/registrationReducer';
import style from './NewPassword.module.css';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import {Simulate} from 'react-dom/test-utils';


type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const NewPassword = () => {

    const dispatch = useAppDispatch()

    const [showValuePass, setShowValuePass] = useState(false)
    const [showValuePassConfirm, setShowValuePassConfirm] = useState(false)

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },

        validate: (values) => {
            const error: FormikErrorType = {};

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

        },
    })

    const clickShowPass = () => {
        setShowValuePass(!showValuePass)
    }
    const clickShowConfirmPass = () => {
        setShowValuePassConfirm(!showValuePassConfirm)
    }


    const MouseDownPass = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    }

    return (
        <div className={style.wrapper}>
            <form className={style.formContainer} onSubmit={formik.handleSubmit}>
                <div className={style.title}>Create new password</div>

                <div className={style.instructionsText}>
                    Create new password and we will send you further instructions to email
                </div>

                <FormControl className={style.inputBlock} variant="standard">
                    <InputLabel color={'secondary'}>Password</InputLabel>
                    <Input
                        id="password"
                        type={showValuePass ? 'text' : 'password'}
                        placeholder={'Password'}
                        className={style.input}
                        color={'secondary'}
                        {...formik.getFieldProps('password')}
                        autoComplete="on"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={clickShowPass}
                                    onMouseDown={MouseDownPass}
                                    color={'primary'}
                                >
                                    {showValuePass ? <VisibilityOff/> :
                                        <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                    {formik.errors.password && formik.touched.password &&
                        <div className={style.error}>{formik.errors.password}</div>}

                </FormControl>


                <FormControl className={style.inputBlock} variant="standard">
                    <InputLabel color={'secondary'}>Confirm
                        password</InputLabel>
                    <Input
                        id="confirmPassword"
                        type={showValuePassConfirm ? 'text' : 'password'}
                        placeholder={'Confirm password'}
                        className={style.input}
                        color={'secondary'}
                        {...formik.getFieldProps('confirmPassword')}
                        autoComplete="on"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={clickShowConfirmPass}
                                    onMouseDown={MouseDownPass}
                                    color={'primary'}
                                >
                                    {showValuePassConfirm ?
                                        <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                    {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                        <div className={style.error}>{formik.errors.confirmPassword}</div>}

                </FormControl>


                <Button color={'primary'} variant={'contained'} type="submit">Create new password</Button>

            </form>

        </div>
    );
};

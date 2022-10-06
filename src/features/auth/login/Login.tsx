import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import { useFormik } from 'formik'
import { Link, Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../bll/store'
import SuperButton from '../../../common/components/superButton/SuperButton'
import style from '../recovery/Recovery.module.css'

import styles from './Login.module.css'
import { loginTC } from './loginReducer'

const Zoom = require('react-reveal/Zoom')

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

const Login = () => {
  const [visibleMode, setVisibleMode] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Invalid password'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(loginTC(values.email, values.password, values.rememberMe))
      formik.resetForm()
    },
  })

  const onClickHandler = () => {
    setVisibleMode(!visibleMode)
  }

  if (isLoggedIn) {
    return <Navigate to={'/packs_list/'} />
  }

  return (
    <div className={styles.wrapper}>
      <Zoom duration={'2000'}>
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
          {formik.errors.email && formik.touched.email && (
            <div className={styles.emailError}>{formik.errors.email}</div>
          )}
          <FormControl variant="standard">
            <InputLabel color="primary">Password</InputLabel>
            <Input
              id="password"
              type={visibleMode ? 'text' : 'password'}
              placeholder={'password'}
              color={'primary'}
              className={style.input}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onClickHandler} color={'primary'}>
                    {visibleMode ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              {...formik.getFieldProps('password')}
            />
          </FormControl>
          {formik.errors.password && formik.touched.password && (
            <div className={styles.passwordError}>{formik.errors.password}</div>
          )}
          <FormControl>
            <FormControlLabel className={styles.input} control={<Checkbox />} label="Remember me" />
          </FormControl>
          <div className={styles.recover}>
            <Link className={styles.link} to={'/recovery'}>
              Forgot Password?
            </Link>
          </div>
          <SuperButton
            style={{
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '20px',
              letterSpacing: '0.01em',
            }}
            type="submit"
          >
            Sign in
          </SuperButton>
          <span className={styles.text}>Don`t have an account?</span>

          <Link className={styles.link} to={'/registration'}>
            Sign Up
          </Link>
        </form>
      </Zoom>
    </div>
  )
}

export default Login

import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../bll/store'
import SuperButton from '../../../common/components/superButton/SuperButton'
import {
  selectLoginIsLoggedIn,
  selectNewPasswordIsCreated,
} from '../../../utils/selectors/selectors'

import style from './NewPassword.module.css'
import { createNewPasswordTC } from './newPasswordReducer'

const Zoom = require('react-reveal/Zoom')

type FormikErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}

const NewPassword = () => {
  const dispatch = useAppDispatch()
  const isCreated = useAppSelector<boolean>(selectNewPasswordIsCreated)
  const isLoggedIn = useAppSelector<boolean>(selectLoginIsLoggedIn)

  // const navigate = useNavigate(); ????
  const [showValuePass, setShowValuePass] = useState(false)
  const [showValuePassConfirm, setShowValuePassConfirm] = useState(false)

  let params = useParams()

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },

    validate: values => {
      const error: FormikErrorType = {}

      if (!values.password) {
        error.password = 'Required'
      } else if (values.password.length <= 7) {
        error.password = 'Password must be more than 7 characters...'
      }
      if (!values.confirmPassword) {
        error.confirmPassword = 'Required'
      } else if (values.confirmPassword !== values.password) {
        error.confirmPassword = 'The password and confirmation password do not match'
      }

      return error
    },
    onSubmit: values => {
      dispatch(createNewPasswordTC(values.password, params.token ? params.token : ''))
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

  // if (isCreated) {
  //     navigate('/login')
  // }

  if (isCreated) {
    return <Navigate to={'/login/'} />
  }

  if (isLoggedIn) {
    return <Navigate to={'/profile/'} />
  }

  return (
    <div className={style.wrapper}>
      <Zoom duration={'2000'}>
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
                  <IconButton onClick={clickShowPass} onMouseDown={MouseDownPass} color={'primary'}>
                    {showValuePass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

            {formik.errors.password && formik.touched.password && (
              <div className={style.error}>{formik.errors.password}</div>
            )}
          </FormControl>

          <FormControl className={style.inputBlock} variant="standard">
            <InputLabel color={'secondary'}>Confirm password</InputLabel>
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
                    {showValuePassConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <div className={style.error}>{formik.errors.confirmPassword}</div>
            )}
          </FormControl>

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
            Create new password
          </SuperButton>
        </form>
      </Zoom>
    </div>
  )
}

export default NewPassword

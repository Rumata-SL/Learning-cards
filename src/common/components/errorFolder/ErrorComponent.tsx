import React from 'react'

import { NavLink } from 'react-router-dom'

import errorImg from '../../../assets/image/404.svg'
import { PATH } from '../../enum/path'
import SuperButton from '../superButton/SuperButton'

import s from './ErrorComponent.module.css'

const ErrorComponent = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.text}>
        <h2 className={s.title}>Ooops!</h2>
        <span className={s.subTitle}>Sorry! Page not found!</span>
        <NavLink to={PATH.PACKS_LIST}>
          <SuperButton className={s.button}>Back to home page</SuperButton>
        </NavLink>
      </div>
      <div>
        <img src={errorImg} alt="error" />
      </div>
    </div>
  )
}

export default ErrorComponent

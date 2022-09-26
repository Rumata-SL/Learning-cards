import React from 'react'

import avatar from '../../../assets/image/avatar.png'
import logo from '../../../assets/image/logo.svg'
import { useAppSelector } from '../../../bll/store'
import SuperButton from '../superButton/SuperButton'

import s from './Header.module.css'

export const Header = () => {
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const profileName = useAppSelector(state => state.profile.profile.name)

  return (
    <div className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>
          <img src={logo} alt="logo" />
        </div>
        {isLoggedIn ? (
          <div className={s.user}>
            <span>{profileName}</span>
            <div className={s.photo}>
              <img src={avatar} alt="avatar" />
            </div>
          </div>
        ) : (
          <div className={s.buttonSignIn}>
            <SuperButton>Sign in</SuperButton>
          </div>
        )}
      </div>
    </div>
  )
}

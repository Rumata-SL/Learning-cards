import React, { useEffect, useRef, useState } from 'react'

import { NavLink } from 'react-router-dom'

import defaultAva from '../../../assets/image/avatar.png'
import logoutIcon from '../../../assets/image/icons/logout.svg'
import userIcon from '../../../assets/image/icons/user.svg'
import logo from '../../../assets/image/logo.svg'
import { useAppDispatch, useAppSelector } from '../../../bll/store'
import { logoutTC } from '../../../features/auth/login/loginReducer'
import {
  selectLoginIsLoggedIn,
  selectProfileAvatar,
  selectProfileName,
} from '../../../utils/selectors/selectors'
import { PATH } from '../../enum/path'
import SuperButton from '../superButton/SuperButton'

import s from './Header.module.css'

export const Header = () => {
  const dispatch = useAppDispatch()
  const avatar = useAppSelector(selectProfileAvatar)
  const isLoggedIn = useAppSelector(selectLoginIsLoggedIn)
  const profileName = useAppSelector(selectProfileName)
  const [togglePopup, setTogglePopup] = useState(false)
  const popupRef = useRef(null)

  const onTogglePopupHandler = () => {
    setTogglePopup(!togglePopup)
  }

  const handleOutsideClick = (e: any) => {
    if (!e.path.includes(popupRef.current)) {
      setTogglePopup(false)
    }
  }

  const logout = () => {
    dispatch(logoutTC())
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)

    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div className={s.header}>
      <div className={s.container}>
        <NavLink to={PATH.PACKS_LIST}>
          <div className={s.logo}>
            <img src={logo} alt="logo" />
          </div>
        </NavLink>
        {isLoggedIn ? (
          <div ref={popupRef} className={s.user} onClick={onTogglePopupHandler}>
            <span className={s.name}>{profileName}</span>
            <div className={s.photo}>
              <img src={avatar || defaultAva} alt="avatar" />
            </div>
            {togglePopup && (
              <div className={s.popup}>
                <NavLink to={PATH.PROFILE}>
                  <div className={s.link}>
                    <img src={userIcon} alt="user" />
                    <span>Profile</span>
                  </div>
                </NavLink>
                <div className={s.link} onClick={logout}>
                  <img src={logoutIcon} alt="logout" />
                  <span>Log out</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={s.buttonSignIn}>
            <NavLink to={PATH.LOGIN}>
              <SuperButton
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '113px',
                  fontFamily: 'Montserrat',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                Sign in
              </SuperButton>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  )
}

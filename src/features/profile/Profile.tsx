import React from 'react'

import { Navigate } from 'react-router-dom'

import { EditMeArgsType } from '../../api/profileAPI'
import logoutIcon from '../../assets/image/icons/logout.svg'
import { useAppDispatch, useAppSelector } from '../../bll/store'
import { BackToPackList } from '../../common/components/backToPackList/BackToPackList'
import { logoutTC } from '../auth/login/loginReducer'

import { AvatarProfile } from './avatar/AvatarProfile'
import { EditableProfileName } from './editableProfileName/EditableProfileName'
import s from './Profile.module.css'
import { updateProfileTC } from './profileReducer'

const Fade = require('react-reveal/Fade')
const Zoom = require('react-reveal/Zoom')

const Profile = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.profile.profile)
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

  const updateProfile = (args: EditMeArgsType) => {
    dispatch(updateProfileTC(args))
  }

  const logout = () => {
    dispatch(logoutTC())
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={s.wrapper}>
      <Fade left duration={'2000'}>
        <BackToPackList />
      </Fade>

      <Zoom duration={'2000'}>
        <div className={s.container}>
          <h3 className={s.title}>Personal Information</h3>
          <AvatarProfile />
          <EditableProfileName profile={profile} updateProfile={updateProfile} />
          <span className={s.email}>{profile.email}</span>

          <div className={s.logoutButtonBlock}>
            <button className={s.logoutButton} onClick={logout}>
              <img src={logoutIcon} alt="logout" />
              Log out
            </button>
          </div>
        </div>
      </Zoom>
    </div>
  )
}

export default Profile

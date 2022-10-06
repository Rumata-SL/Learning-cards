import React from 'react'

import { Navigate } from 'react-router-dom'

import { EditMeArgsType } from '../../api/profileAPI'
import avatar from '../../assets/image/avatar.png'
import logoutIcon from '../../assets/image/icons/logout.svg'
import changePhoto from '../../assets/image/icons/photo.svg'
import { useAppDispatch, useAppSelector } from '../../bll/store'
import { BackToPackList } from '../../common/components/backToPackList/BackToPackList'
import { logoutTC } from '../auth/login/loginReducer'

import { EditableProfileName } from './editableProfileName/EditableProfileName'
import s from './Profile.module.css'
import { updateProfileTC } from './profileReducer'

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
      <BackToPackList />
      <div className={s.container}>
        <h3 className={s.title}>Personal Information</h3>
        <div className={s.avatarBlock}>
          <div className={s.avatar}>
            <div className={s.holder}>
              <img src={avatar} alt="avatar" />
            </div>
            <button className={s.changeAvatarButton}>
              <img src={changePhoto} alt="changePhoto" />
            </button>
          </div>
        </div>
        <EditableProfileName profile={profile} updateProfile={updateProfile} />
        <span className={s.email}>{profile.email}</span>

        <div className={s.logoutButtonBlock}>
          <button className={s.logoutButton} onClick={logout}>
            <img src={logoutIcon} alt="logout" />
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile

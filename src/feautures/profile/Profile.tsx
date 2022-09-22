import React, { useEffect } from 'react'
import s from './Profile.module.css'
import avatar from '../../assets/image/avatar.png'
import changePhoto from '../../assets/image/icons/photo.svg'
import logoutIcon from '../../assets/image/icons/logout.svg'
import { useAppDispatch, useAppSelector } from '../../bll/store'
import { getProfileTC, updateProfileTC } from './profileReducer'
import CircularProgress from '@mui/material/CircularProgress'
import { EditMeArgsType } from '../../api/profileAPI'
import { Navigate } from 'react-router-dom'
import { logoutTC } from '../login/loginReducer'
import {EditableProfileName} from "./editableProfileName/EditableProfileName";

export const Profile = () => {
	const dispatch = useAppDispatch()
	const profile = useAppSelector(state => state.profile.profile)
	const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

	const updateProfile = (args: EditMeArgsType) => {
		dispatch(updateProfileTC(args))
	}
	const logout = () => {
		dispatch(logoutTC())
	}
	useEffect(() => {
		if (!isLoggedIn) return
		dispatch(getProfileTC())
	}, [isLoggedIn])

	if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	}

	if (!profile) {
		return (
			<div
				style={{
					position: 'fixed',
					top: '30%',
					textAlign: 'center',
					width: '100%',
				}}
			>
				<CircularProgress />
			</div>
		)
	}

	return (
		<div className={s.wrapper}>
			<div className={s.container}>
				<h3 className={s.title}>Personal Information</h3>
				<div className={s.avatarBlock}>
					<div className={s.avatar}>
						<div className={s.holder}>
							<img src={avatar} alt='avatar' />
						</div>
						<button className={s.changeAvatarButton}>
							<img src={changePhoto} alt='changePhoto' />
						</button>
					</div>
				</div>
				<EditableProfileName profile={profile} updateProfile={updateProfile} />
				<span className={s.email}>{profile.email}</span>

				<div className={s.logoutButtonBlock}>
					<button className={s.logoutButton} onClick={logout}>
						<img src={logoutIcon} alt='logout' />
						Log out
					</button>
				</div>
			</div>
		</div>
	)
}



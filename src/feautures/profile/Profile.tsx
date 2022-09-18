import React, { ChangeEvent, useEffect, useState } from 'react'
import s from './Profile.module.css'
import avatar from './assets/avatar.png'
import changePhoto from './assets/photo.svg'
import editIcon from './assets/edit.svg'
import logoutIcon from './assets/logout.svg'
import { useAppDispatch, useAppSelector } from '../../bll/store'
import { getProfileTC, updateProfileTC } from './profileReducer'
import CircularProgress from '@mui/material/CircularProgress'
import { EditMeArgsType, ProfileType } from '../../api/profileAPI'

export const Profile = () => {
	const dispatch = useAppDispatch()
	const profile = useAppSelector(state => state.profile.profile)

	const updateProfile = (args: EditMeArgsType) => {
		dispatch(updateProfileTC(args))
	}

	useEffect(() => {
		dispatch(getProfileTC())
	}, [])

	if (!profile)
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
					<button className={s.logoutButton}>
						<img src={logoutIcon} alt='logout' />
						Log out
					</button>
				</div>
			</div>
		</div>
	)
}

type EditableProfileNamePropsType = {
	profile: ProfileType
	updateProfile: (args: EditMeArgsType) => void
}

const EditableProfileName: React.FC<EditableProfileNamePropsType> = ({
	profile,
	updateProfile,
}) => {
	const [editMode, setEditMode] = useState(false)
	const [name, setName] = useState(profile.name)

	const activateEditMode = () => {
		setEditMode(true)
	}
	const activateViewMode = () => {
		updateProfile({ name })
		setEditMode(false)
	}
	const changeName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.currentTarget.value)
	}

	return (
		<>
			{editMode ? (
				<div className={s.editNameBlock}>
					<label htmlFor='profileName'>Nickname</label>
					<div className={s.editNameForm}>
						<input
							id='profileName'
							type='text'
							value={name}
							onChange={changeName}
						/>
						<button className={s.saveButton} onClick={activateViewMode}>
							SAVE
						</button>
					</div>
				</div>
			) : (
				<div className={s.nameBlock}>
					<h4 className={s.name}>{profile.name}</h4>
					<button className={s.onEditModeButton} onClick={activateEditMode}>
						<img src={editIcon} alt='edit' />
					</button>
				</div>
			)}
		</>
	)
}

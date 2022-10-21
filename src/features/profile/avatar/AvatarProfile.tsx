import React, { ChangeEvent, useEffect, useState } from 'react'

import { IconButton } from '@mui/material'

import { setAppErrorAC } from '../../../app/appReducer'
import defaultAva from '../../../assets/image/avatar.png'
import changePhoto from '../../../assets/image/icons/photo.svg'
import { useAppDispatch, useAppSelector } from '../../../bll/store'
import { convertFileToBase64 } from '../../../utils/convertFileToBase64'
import { selectProfileAvatar } from '../../../utils/selectors/selectors'
import { updateProfileTC } from '../profileReducer'

import s from './AvatarProfile.module.css'
export const AvatarProfile = () => {
  const dispatch = useAppDispatch()
  const avatar = useAppSelector(selectProfileAvatar)
  const [ava, setAva] = useState(avatar || defaultAva)
  const [isAvaBroken, setIsAvaBroken] = useState(false)

  useEffect(() => {
    setAva(avatar || defaultAva)
  }, [avatar])

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(updateProfileTC({ avatar: file64 }))
        })
      } else {
        dispatch(setAppErrorAC('Файл слишком большого размера'))
      }
    }
  }

  const errorHandler = () => {
    setIsAvaBroken(true)
    dispatch(setAppErrorAC('Кривая картинка'))
  }

  return (
    <div className={s.avatarBlock}>
      <div className={s.avatar}>
        <div className={s.holder}>
          <img src={isAvaBroken ? defaultAva : ava} alt="avatar" onError={errorHandler} />
        </div>
        <label className={s.changeAvatarButton}>
          <input
            type="file"
            onChange={uploadHandler}
            style={{ display: 'none' }}
            accept="image/*"
          />
          <IconButton component="span">
            <img src={changePhoto} alt="changePhoto" />
          </IconButton>
        </label>
      </div>
    </div>
  )
}

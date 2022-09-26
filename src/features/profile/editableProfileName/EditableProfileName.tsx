import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import { FormControl, Input, InputLabel } from '@mui/material'

import { ProfileType } from '../../../api/auth/authAPI'
import { EditMeArgsType } from '../../../api/profileAPI'
import editIcon from '../../../assets/image/icons/edit.svg'

import s from './EditableProfileName.module.css'

type EditableProfileNamePropsType = {
  profile: ProfileType
  updateProfile: (args: EditMeArgsType) => void
}

export const EditableProfileName: React.FC<EditableProfileNamePropsType> = ({
  profile,
  updateProfile,
}) => {
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(profile.name)
  const [error, setError] = useState<string | null>(null)

  const activateEditMode = () => {
    setEditMode(true)
  }
  const activateViewMode = () => {
    if (name.trim() !== '') {
      updateProfile({ name })
      setEditMode(false)
    } else {
      setError('Name is required')
    }
  }
  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setName(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      activateViewMode()
    }
  }

  return (
    <>
      {editMode ? (
        <>
          <div className={s.editNameBlock}>
            <FormControl variant="standard" className={s.editNameInput}>
              <InputLabel color="primary">Nickname</InputLabel>
              <Input
                onKeyDown={onKeyDownHandler}
                id="name"
                placeholder={'Nickname'}
                value={name}
                onChange={changeName}
                color={'primary'}
              />
            </FormControl>
            <button className={s.saveButton} onClick={activateViewMode} disabled={!!error}>
              SAVE
            </button>
          </div>
          {error && <div className={s.error}>{error}</div>}
        </>
      ) : (
        <div className={s.nameBlock}>
          <h4 className={s.name}>{profile.name}</h4>
          <button className={s.onEditModeButton} onClick={activateEditMode}>
            <img src={editIcon} alt="edit" />
          </button>
        </div>
      )}
    </>
  )
}

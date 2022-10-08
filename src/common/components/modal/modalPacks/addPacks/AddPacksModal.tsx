import React, { ChangeEvent, FC, useState } from 'react'

import { Checkbox, FormControlLabel, TextField } from '@mui/material'

import { setAppErrorAC } from '../../../../../app/appReducer'
import defaultCover from '../../../../../assets/image/noImage.png'
import { useAppDispatch } from '../../../../../bll/store'
import { addPackTC } from '../../../../../features/packsList/packsListReducer'
import { convertFileToBase64 } from '../../../../../utils/convertFileToBase64'
import { ModalComponent } from '../../ModalComponent'

import s from './AddPacksModal.module.css'

type AddModalPacksPropsType = {
  isOpenModal: boolean
  setIsModalOpen: (value: boolean) => void
}

export const AddPacksModal: FC<AddModalPacksPropsType> = props => {
  const { isOpenModal, setIsModalOpen } = props

  const dispatch = useAppDispatch()

  const [packName, setPackName] = useState('')
  const [deckCover, setDeckCover] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addPack = () => {
    if (packName.trim() !== '') {
      if (deckCover) {
        dispatch(addPackTC(packName, deckCover, isPrivate))
      } else {
        dispatch(addPackTC(packName, undefined, isPrivate))
      }
      setPackName('')
      setDeckCover('')
      setIsModalOpen(false)
    } else {
      setError('Name is required')
    }
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setDeckCover(file64)
        })
      } else {
        dispatch(setAppErrorAC('Файл слишком большого размера'))
      }
    }
  }

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setPackName(e.currentTarget.value)
  }

  return (
    <ModalComponent
      isOpenModal={isOpenModal}
      title={'Add New Pack'}
      setIsModalOpen={setIsModalOpen}
      buttonTitle={'Save'}
      operationClick={addPack}
      buttonColor={'primary'}
    >
      <div style={{ margin: '30px 0 0 0 ' }}>
        <div>
          <div className={s.changeCoverBlock}>
            <h4 className={s.coverTitle}>Cover</h4>
            <label className={s.coverLabel}>
              <input
                type="file"
                onChange={uploadHandler}
                style={{ display: 'none' }}
                accept="image/*"
              />
              <span>Change cover</span>
            </label>
          </div>
          <div className={s.coverBlock}>
            <img src={deckCover || defaultCover} alt="cover" />
          </div>
        </div>
        <TextField
          id="standard-basic"
          fullWidth
          label="Enter Pack Name"
          variant="standard"
          value={packName}
          onChange={changeNameHandler}
        />
        {error && <div className={s.error}>{error}</div>}
      </div>
      <div>
        <FormControlLabel
          label="Private pack"
          control={
            <Checkbox checked={isPrivate} onChange={e => setIsPrivate(e.currentTarget.checked)} />
          }
        />
      </div>
    </ModalComponent>
  )
}

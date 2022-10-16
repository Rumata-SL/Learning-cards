import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Checkbox, FormControlLabel, IconButton, TextField } from '@mui/material'

import { CardPacksType } from '../../../../api/cards/packsListAPI'
import { setAppErrorAC } from '../../../../app/appReducer'
import defaultCover from '../../../../assets/image/noImage.png'
import { useAppDispatch } from '../../../../bll/store'
import { PackType } from '../../../../features/packsList/pack/packReducer'
import { updatePackTC } from '../../../../features/packsList/packsListReducer'
import { InputFile } from '../../inputFile/InputFile'
import { ModalComponent } from '../ModalComponent'
import s from '../ModalComponent.module.css'
import st from '../modalPacks/addPacks/AddPacksModal.module.css'

type UpdatePackModalPropsType = {
  isModalOpen: boolean
  pack?: CardPacksType
  cardPack?: PackType
  packName: string
  id: string
  setIsModalOpen: (value: boolean) => void
}

export const UpdatePackModal: FC<UpdatePackModalPropsType> = props => {
  const { isModalOpen, pack, cardPack, packName, id, setIsModalOpen } = props

  const dispatch = useAppDispatch()
  const [newName, setNewName] = useState(packName ? packName : '')
  const [isPrivate, setIsPrivate] = useState(false)
  const [deckCover, setDeckCover] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    pack && setNewName(pack.name)
    cardPack && setNewName(cardPack.packName)
  }, [pack, cardPack])

  useEffect(() => {
    pack && setDeckCover(pack.deckCover)
    cardPack && setDeckCover(cardPack.packDeckCover)
  }, [pack, cardPack])

  const updatePackHandler = () => {
    if (newName.trim() !== '') {
      dispatch(updatePackTC(id, deckCover, newName, isPrivate))
      setNewName(newName)
      setIsModalOpen(false)
    } else {
      setError('Name is required')
    }
  }

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setNewName(e.currentTarget.value)
  }

  const errorHandler = () => {
    dispatch(setAppErrorAC('Не правильный файл'))
  }

  return (
    <ModalComponent
      title={'Edit Pack'}
      isOpenModal={isModalOpen}
      buttonTitle={'Save'}
      buttonColor={'primary'}
      setIsModalOpen={setIsModalOpen}
      operationClick={updatePackHandler}
    >
      <div style={{ margin: '30px 0 0 0 ' }}>
        <TextField
          id="standard-basic"
          fullWidth
          label="Enter New Pack Name"
          variant="standard"
          value={newName}
          onChange={changeNameHandler}
        />
        {error && <div className={st.error}>{error}</div>}
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox checked={isPrivate} onChange={e => setIsPrivate(e.currentTarget.checked)} />
          }
          label="Private pack"
        />
      </div>
      Pack cover preview
      <div className={s.imgContainer}>
        {pack?.deckCover ? (
          <img src={deckCover} className={s.img} onError={errorHandler} alt="img" />
        ) : (
          <img src={deckCover ?? defaultCover} className={s.img} onError={errorHandler} alt="img" />
        )}
      </div>
      <InputFile uploadFile={(image: string) => setDeckCover(image)}>
        <div className={s.upload}>
          <IconButton component="span">
            <CloudUploadIcon color={'primary'} />
          </IconButton>
        </div>
      </InputFile>
    </ModalComponent>
  )
}

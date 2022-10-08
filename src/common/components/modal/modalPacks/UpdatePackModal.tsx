import React, { FC, useEffect, useState } from 'react'

import { Checkbox, FormControlLabel, TextField } from '@mui/material'

import { CardPacksType } from '../../../../api/cards/packsListAPI'
import { useAppDispatch } from '../../../../bll/store'
import { PackType } from '../../../../features/packsList/pack/packReducer'
import { updatePackTC } from '../../../../features/packsList/packsListReducer'
import { ModalComponent } from '../ModalComponent'

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

  useEffect(() => {
    pack && setNewName(pack.name)
    cardPack && setNewName(cardPack.packName)
  }, [pack, cardPack])

  const updatePackHandler = () => {
    dispatch(updatePackTC(id, newName))
    setNewName(newName)
    setIsModalOpen(false)
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
          onChange={e => setNewName(e.currentTarget.value)}
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox checked={isPrivate} onChange={e => setIsPrivate(e.currentTarget.checked)} />
          }
          label="Private pack"
        />
      </div>
    </ModalComponent>
  )
}

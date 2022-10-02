import React, { FC, useEffect, useState } from 'react'

import { Checkbox, FormControlLabel, TextField } from '@mui/material'

import { CardPacksType } from '../../../api/cards/packsListAPI'
import { useAppDispatch } from '../../../bll/store'
import { updatePackTC } from '../../packsList/packsListReducer'
import { ModalComponent } from '../ModalComponent'

type UpdatePackModalPropsType = {
  isModalOpen: boolean
  pack: CardPacksType
  packName: string
  id: string
  setIsModalOpen: (value: boolean) => void
}

export const UpdatePackModal: FC<UpdatePackModalPropsType> = props => {
  const { isModalOpen, pack, packName, id, setIsModalOpen } = props

  const dispatch = useAppDispatch()
  const [newName, setNewName] = useState(packName ? packName : '')
  const [isPrivate, setIsPrivate] = useState(false)

  useEffect(() => {
    pack && setNewName(pack.name)
  }, [pack])

  const updatePackHandler = () => {
    pack && dispatch(updatePackTC(id, newName))
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
      <TextField
        id="standard-basic"
        fullWidth
        label="Enter New Pack Name"
        variant="standard"
        value={newName}
        onChange={e => setNewName(e.currentTarget.value)}
      />
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

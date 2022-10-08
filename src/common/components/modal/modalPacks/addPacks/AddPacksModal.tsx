import React, { FC, useState } from 'react'

import { Checkbox, FormControlLabel, TextField } from '@mui/material'

import Img from '../../../../assets/image/icons/fakeImg.svg'
import defaultCover from '../../../../assets/image/noImage.png'
import { useAppDispatch } from '../../../../bll/store'
import { addPackTC } from '../../../../features/packsList/packsListReducer'
import { ModalComponent } from '../ModalComponent'

type AddModalPacksPropsType = {
  isOpenModal: boolean
  setIsModalOpen: (value: boolean) => void
}

export const AddPacksModal: FC<AddModalPacksPropsType> = props => {
  const { isOpenModal, setIsModalOpen } = props

  const dispatch = useAppDispatch()

  const [packName, setPackName] = useState('')
  const [deckCover, setDeckCover] = useState(Img)
  const [isPrivate, setIsPrivate] = useState(false)

  const addPack = () => {
    dispatch(addPackTC(packName, deckCover, isPrivate))
    setPackName('')
    setDeckCover(Img)
    setIsModalOpen(false)
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
          <div>
            <h4>Cover</h4>
            <label>Change cover</label>
          </div>
          <div>
            <img src={defaultCover} alt="cover" />
          </div>
        </div>
        <TextField
          id="standard-basic"
          fullWidth
          label="Enter Pack Name"
          variant="standard"
          value={packName}
          onChange={e => setPackName(e.currentTarget.value)}
        />
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

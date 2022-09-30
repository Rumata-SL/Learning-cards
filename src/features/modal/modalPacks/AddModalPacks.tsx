import React, { FC } from 'react'

import { Checkbox, FormControlLabel, TextField } from '@mui/material'

import { ModalComponent } from '../ModalComponent'

type AddModalPacksPropsType = {
  isOpenModal: boolean
  setIsModalOpen: (value: boolean) => void
}

export const AddModalPacks: FC<AddModalPacksPropsType> = props => {
  const { isOpenModal, setIsModalOpen } = props

  return (
    <ModalComponent
      isOpenModal={isOpenModal}
      title={'AddModalPacks'}
      setIsModalOpen={setIsModalOpen}
    >
      <div>
        <TextField
          id="standard-basic"
          fullWidth
          label="Enter Pack Title"
          variant="standard"
          value={''}
          onChange={() => {}}
        />
      </div>
      <div>
        <FormControlLabel
          control={<Checkbox checked={false} onChange={() => {}} />}
          label="Private pack"
        />
      </div>
      Pack cover preview
      <div>{/*<img src={$$} alt="img" />*/}</div>
    </ModalComponent>
  )
}

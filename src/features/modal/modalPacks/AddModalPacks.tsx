import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import { ModalComponent } from '../ModalComponent'

export const AddModalPacks = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <ModalComponent isOpenModal={isOpenModal} title={'AddModalPacks'}>
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

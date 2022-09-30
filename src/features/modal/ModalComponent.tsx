import { Box, Button, IconButton, Modal } from '@mui/material'
import React, { FC, ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import s from './ModalComponent.module.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type ModalPropsType = {
  children: ReactNode
  isOpenModal: boolean
  title: string
}

export const ModalComponent: FC<ModalPropsType> = props => {
  const { children, isOpenModal, title } = props
  return (
    <Modal open={isOpenModal}>
      <Box sx={style}>
        <div className={s.headerModal}>
          <h2>{title}</h2>
          <IconButton aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
        <hr />
        <div>{children}</div>
        <div className={s.buttons}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained"></Button>
        </div>
      </Box>
    </Modal>
  )
}

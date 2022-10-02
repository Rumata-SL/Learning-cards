import React, { FC, ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, IconButton, Modal } from '@mui/material'

import s from './ModalComponent.module.css'
import { style } from './StyleFofModal'

type ModalPropsType = {
  title: string
  children: ReactNode
  isOpenModal: boolean
  buttonTitle: string
  buttonColor: 'primary' | 'error'

  setIsModalOpen: (value: boolean) => void
  operationClick: () => void
}

export const ModalComponent: FC<ModalPropsType> = props => {
  const { children, isOpenModal, title, buttonTitle, buttonColor, setIsModalOpen, operationClick } =
    props

  const closeModalHandler = () => {
    console.log('false')
    setIsModalOpen(false)
  }

  return (
    <Modal open={isOpenModal} onClose={closeModalHandler}>
      <Box sx={style}>
        <div className={s.headerModal}>
          <h2>{title}</h2>
          <IconButton aria-label="close" onClick={closeModalHandler}>
            <CloseIcon />
          </IconButton>
        </div>
        <hr />
        <div>{children}</div>
        <div className={s.buttons}>
          <Button
            variant="outlined"
            style={{ width: '127px', height: '30px', borderRadius: '30px' }}
            onClick={closeModalHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ width: '127px', height: '30px', borderRadius: '30px', background: '#366EFF' }}
            color={buttonColor}
            onClick={() => operationClick()}
          >
            {buttonTitle}
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

import React, { FC, ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, IconButton, Modal } from '@mui/material'

import s from './ModalComponent.module.css'
import { style, styleBtn } from './StyleFofModal'

type ModalPropsType = {
  title: string
  isOpenModal: boolean
  buttonTitle: string
  buttonColor: 'primary' | 'error'
  children: ReactNode

  setIsModalOpen: (value: boolean) => void
  operationClick: () => void
}

export const ModalComponent: FC<ModalPropsType> = props => {
  const { children, isOpenModal, title, buttonTitle, buttonColor, setIsModalOpen, operationClick } =
    props

  const closeModalHandler = () => {
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
          <Button variant="outlined" style={styleBtn} onClick={closeModalHandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            style={styleBtn}
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

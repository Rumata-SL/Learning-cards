import React, { FC } from 'react'

import { useAppDispatch } from '../../../bll/store'
import { deleteCardTC } from '../../packsList/pack/packReducer'
import { ModalComponent } from '../ModalComponent'
import s from '../modalPacks/DeletePacksModal.module.css'

type DeleteCardModalPropsType = {
  id: string
  question: string
  cardName?: string
  cardsPack_id: string
  isOpenModal: boolean

  setIsModalOpen: (value: boolean) => void
}

export const DeleteCardModal: FC<DeleteCardModalPropsType> = props => {
  const { id, question, cardName, cardsPack_id, isOpenModal, setIsModalOpen } = props

  const dispatch = useAppDispatch()

  const deleteCard = () => {
    dispatch(deleteCardTC(cardsPack_id, id))
    setIsModalOpen(false)
  }

  return (
    <ModalComponent
      title={'Delete Card'}
      isOpenModal={isOpenModal}
      setIsModalOpen={setIsModalOpen}
      buttonTitle={'Delete'}
      operationClick={deleteCard}
      buttonColor={'error'}
    >
      <div>
        <p>
          Do you really want to remove card <span className={s.packName}>{cardName}</span> ?
        </p>
        Question : <span className={s.packName}> {question}</span>
      </div>
    </ModalComponent>
  )
}

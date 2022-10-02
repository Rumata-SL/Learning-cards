import React, { FC } from 'react'

import { useAppDispatch } from '../../../bll/store'
import { deletePackTC } from '../../packsList/packsListReducer'
import { ModalComponent } from '../ModalComponent'

import s from './DeletePacksModal.module.css'

type DeletePackModalPropsType = {
  id: string
  packName?: string
  isModalOpen: boolean

  setIsModalOpen: (value: boolean) => void
}

export const DeletePacksModal: FC<DeletePackModalPropsType> = props => {
  const { id, packName, isModalOpen, setIsModalOpen } = props

  const dispatch = useAppDispatch()

  const deleteCardPack = () => {
    dispatch(deletePackTC(id))
    setIsModalOpen(false)
  }

  return (
    <ModalComponent
      title={'Delete Pack'}
      isOpenModal={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      buttonTitle={'Delete'}
      operationClick={deleteCardPack}
      buttonColor={'error'}
    >
      <div>
        <p>
          Do you really want to remove <span className={s.packName}>{packName} </span> ?
        </p>
        <p>All cards will be deleted.</p>
      </div>
    </ModalComponent>
  )
}

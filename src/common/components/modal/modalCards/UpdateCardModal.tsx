import React, { FC, useEffect, useState } from 'react'

import { TextField } from '@mui/material'

import fakeImg from '../../../../assets/image/icons/fakeImg.svg'
import { useAppDispatch } from '../../../../bll/store'
import { updateCardTC } from '../../../../features/packsList/pack/packReducer'
import { ModalComponent } from '../ModalComponent'
import s from '../ModalComponent.module.css'

type UpdateCardModalPropsType = {
  isOpenModal: boolean
  cardsPack_id: string
  id: string
  question: string
  answer: string

  setIsOpenModal: (value: boolean) => void
}

export const UpdateCardModal: FC<UpdateCardModalPropsType> = props => {
  const { isOpenModal, cardsPack_id, id, question, answer, setIsOpenModal } = props

  const dispatch = useAppDispatch()

  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [formatQuestion, setFormatQuestion] = useState<'text' | 'image'>('text')
  const [isImage, setIsImage] = useState(false)
  const [questionImg, setQuestionImg] = useState(fakeImg)

  const updateCard = () => {
    if (cardsPack_id && formatQuestion === 'text') {
      const data = {
        question: newQuestion,
        answer: newAnswer,
        _id: id,
      }

      dispatch(updateCardTC(cardsPack_id, data))
    }
    if (cardsPack_id && formatQuestion === 'image') {
      const data = {
        questionImg: questionImg,
        answer: newAnswer,
        _id: id,
      }

      dispatch(updateCardTC(cardsPack_id, data))
    }
    setIsOpenModal(false)
  }

  useEffect(() => {
    setNewQuestion(question)
    setNewAnswer(answer)
    setQuestionImg(question.slice(0, 10) === 'data:image' ? question : fakeImg)
  }, [question, answer, setQuestionImg])

  return (
    <ModalComponent
      title={'Edit Card'}
      isOpenModal={isOpenModal}
      buttonTitle={'Save'}
      buttonColor={'primary'}
      setIsModalOpen={setIsOpenModal}
      operationClick={updateCard}
    >
      <div className={s.inputContainer}>
        {formatQuestion === 'text' && (
          <TextField
            id="standard-basic"
            fullWidth
            label="Enter Question"
            variant="standard"
            value={newQuestion}
            onChange={e => setNewQuestion(e.currentTarget.value)}
          />
        )}
        {formatQuestion === 'image' && (
          <>
            <div className={s.questionTitle}>Question image preview</div>
            <div className={s.imgContainer}>
              <img src={isImage ? fakeImg : questionImg} className={s.img} alt="fakeImg" />
            </div>
          </>
        )}
      </div>
      <div className={s.answer}>
        <TextField
          id="standard-basic"
          fullWidth
          label="Enter Answer"
          variant="standard"
          value={newAnswer}
          onChange={e => setNewAnswer(e.currentTarget.value)}
        />
      </div>
    </ModalComponent>
  )
}

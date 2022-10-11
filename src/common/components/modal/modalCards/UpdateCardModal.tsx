import React, { FC, useEffect, useState } from 'react'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { FormControl, IconButton, InputLabel, NativeSelect, TextField } from '@mui/material'

import { setAppErrorAC } from '../../../../app/appReducer'
import fakeImg from '../../../../assets/image/icons/fakeImg.svg'
import { useAppDispatch } from '../../../../bll/store'
import { updateCardTC } from '../../../../features/packsList/pack/packReducer'
import { InputFile } from '../../inputFile/InputFile'
import { ModalComponent } from '../ModalComponent'
import s from '../ModalComponent.module.css'
import { styleSelect } from '../StyleFofModal'

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

  /*let formatQuestion: string

  if (question.slice(0, 10) === 'data:image') {
    formatQuestion = 'image'
  } else {
    formatQuestion = 'text'
  }*/
  const [formatQuestion, setFormatQuestion] = useState<'text' | 'image'>('text')
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [imgQuestion, setImgQuestion] = useState(
    question.slice(0, 10) === 'data:image' ? question : fakeImg
  )
  const [isImage, setIsImage] = useState(false)
  // const [questionImg, setQuestionImg] = useState(fakeImg)

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
        question: imgQuestion,
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
    setImgQuestion(question.slice(0, 10) === 'data:image' ? question : fakeImg)
  }, [question, answer, setImgQuestion])

  const errorHandler = () => {
    dispatch(setAppErrorAC('Не правильный файл'))
  }

  const changeFormatQuestionHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormatQuestion(event.target.value as 'text' | 'image')
  }

  return (
    <ModalComponent
      title={'Edit Card'}
      isOpenModal={isOpenModal}
      buttonTitle={'Save'}
      buttonColor={'primary'}
      setIsModalOpen={setIsOpenModal}
      operationClick={updateCard}
    >
      <div>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Choose question format
          </InputLabel>
          <NativeSelect
            style={styleSelect}
            defaultValue={formatQuestion}
            onChange={changeFormatQuestionHandler}
          >
            <option value={'image'}>Image</option>
            <option value={'text'}>Text</option>
          </NativeSelect>
        </FormControl>
      </div>
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
              <img
                src={imgQuestion ?? fakeImg}
                className={s.img}
                alt="fakeImg"
                onError={errorHandler}
              />
            </div>

            <InputFile uploadFile={(image: string) => setImgQuestion(image)}>
              <div className={s.upload}>
                <IconButton component="span">
                  <CloudUploadIcon color={'primary'} />
                </IconButton>
              </div>
            </InputFile>
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

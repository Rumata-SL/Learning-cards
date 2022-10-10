import React, { FC, useState } from 'react'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { FormControl, IconButton, InputLabel, NativeSelect, TextField } from '@mui/material'
import { useParams } from 'react-router-dom'

import fakeImg from '../../../../assets/image/icons/fakeImg.svg'
import { useAppDispatch } from '../../../../bll/store'
import { createCardTC } from '../../../../features/packsList/pack/packReducer'
import { InputFile } from '../../inputFile/InputFile'
import { ModalComponent } from '../ModalComponent'
import s from '../ModalComponent.module.css'
import { styleSelect } from '../StyleFofModal'

type AddCardModalPropsType = {
  isOpenModal: boolean
  setIsModalOpen: (value: boolean) => void
}

export const AddCardModal: FC<AddCardModalPropsType> = props => {
  const { isOpenModal, setIsModalOpen } = props

  const dispatch = useAppDispatch()
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [formatQuestion, setFormatQuestion] = useState<'text' | 'image'>('text')
  const [isImage, setIsImage] = useState(false)
  const [questionImg, setQuestionImg] = useState(fakeImg)
  const [newGrade, setNewGrade] = useState(0)
  const { packId } = useParams()
  let id = packId ?? ''

  const addNewCard = () => {
    if (packId && formatQuestion === 'text') {
      const data = {
        cardsPack_id: id,
        question: newQuestion,
        answer: newAnswer,
        grade: newGrade,
      }

      dispatch(createCardTC(data))
    }
    if (packId && formatQuestion === 'image') {
      const data = {
        cardsPack_id: id,
        questionImg: questionImg,
        answer: newAnswer,
        grade: newGrade,
      }

      dispatch(createCardTC(data))
    }
    setNewQuestion('')
    setNewAnswer('')
    setQuestionImg(fakeImg)
    setIsModalOpen(false)
  }

  const changeFormatQuestionHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormatQuestion(event.target.value as 'text' | 'image')
  }

  return (
    <ModalComponent
      title={'Add New Card'}
      isOpenModal={isOpenModal}
      buttonTitle={'Save'}
      buttonColor={'primary'}
      setIsModalOpen={setIsModalOpen}
      operationClick={addNewCard}
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
              <img src={isImage ? fakeImg : questionImg} className={s.img} alt="fakeImg" />
            </div>

            <InputFile uploadFile={(image: string) => setQuestionImg(image)}>
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

import React, { ChangeEvent, FC } from 'react'

import { setAppErrorAC } from '../../../app/appReducer'
import { useAppDispatch } from '../../../bll/store'
import { convertFileToBase64 } from '../../../utils/convertFileToBase64'
import { styleInputFile } from '../modal/StyleFofModal'

type InputFilePropsType = {
  uploadFile: (image: string) => void
  children: React.ReactNode
}

export const InputFile: FC<InputFilePropsType> = props => {
  const { children, uploadFile } = props

  const dispatch = useAppDispatch()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          uploadFile(file64)
        })
      } else {
        dispatch(setAppErrorAC('Файл слишком большого размера'))
      }
    }
  }

  return (
    <div>
      <label>
        <input type="file" onChange={uploadHandler} style={styleInputFile} accept="image/*" />
        {children}
      </label>
    </div>
  )
}

import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import { useAppDispatch, useAppSelector } from '../../../../bll/store'
import { SuperInput } from '../../../../common/components/superInput/SuperInput'
import useDebounce from '../../../../common/hooks/useDebounce'
import { changeCardsFiltersAC } from '../packReducer'

import s from './SearchCard.module.css'

type PropsType = {}

export const SearchCard: FC<PropsType> = () => {
  const dispatch = useAppDispatch()
  const cardQuestion = useAppSelector(state => state.pack.searchData.cardQuestion)
  const [value, setValue] = useState(cardQuestion)
  const debouncedValue = useDebounce(value, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    dispatch(changeCardsFiltersAC({ cardQuestion: debouncedValue }))
  }, [debouncedValue])

  useEffect(() => {
    setValue(cardQuestion)
  }, [cardQuestion])

  return (
    <div className={s.searchBlock}>
      <div className={s.searchBlockText}>Search</div>

      <div className={s.inputBlock}>
        <SuperInput value={value} onChange={handleChange} placeholder={'Provide your text'} />
        <SearchOutlinedIcon className={s.searchIcon} sx={{ color: '#ffffff' }} />
      </div>
    </div>
  )
}

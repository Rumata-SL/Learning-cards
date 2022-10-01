import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import { useAppDispatch } from '../../../../bll/store'
import { SuperInput } from '../../../../common/components/superInput/SuperInput'
import useDebounce from '../../../../common/hooks/useDebounce'
import { searchPackNameAC } from '../../packsListReducer'
import t from '../PacksListFilters.module.css'

import s from './SearchPacks.module.css'

type PropsType = {}

export const SearchPacks: FC<PropsType> = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    dispatch(searchPackNameAC(debouncedValue))
  }, [debouncedValue])

  return (
    <div>
      <h3 className={t.filtersTitle}>Search</h3>
      <div className={s.searchInputBlock}>
        <SuperInput value={value} onChange={handleChange} placeholder={'Provide your text'} />
        <SearchOutlinedIcon className={s.searchIcon} sx={{ color: '#ffffff' }} />
      </div>
    </div>
  )
}

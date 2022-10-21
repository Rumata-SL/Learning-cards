import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import { useAppDispatch, useAppSelector } from '../../../../bll/store'
import { SuperInput } from '../../../../common/components/superInput/SuperInput'
import useDebounce from '../../../../common/hooks/useDebounce'
import { selectPackListPackName } from '../../../../utils/selectors/selectors'
import { changeFiltersAC } from '../../packsListReducer'
import t from '../PacksListFilters.module.css'

import s from './SearchPacks.module.css'

type PropsType = {}

export const SearchPacks: FC<PropsType> = () => {
  const dispatch = useAppDispatch()
  const packName = useAppSelector(selectPackListPackName)
  const [value, setValue] = useState(packName)
  const debouncedValue = useDebounce(value, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    dispatch(changeFiltersAC({ packName: debouncedValue }))
  }, [debouncedValue])

  useEffect(() => {
    setValue(packName)
  }, [packName])

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

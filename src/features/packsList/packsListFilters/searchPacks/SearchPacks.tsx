import React, { FC } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import { SuperInput } from '../../../../common/components/superInput/SuperInput'
import t from '../PacksListFilters.module.css'

import s from './SearchPacks.module.css'

type PropsType = {}

export const SearchPacks: FC<PropsType> = () => {
  return (
    <div>
      <h3 className={t.filtersTitle}>Search</h3>
      <div className={s.searchInputBlock}>
        <SuperInput placeholder={'Provide your text'} />
        <SearchOutlinedIcon className={s.searchIcon} sx={{ color: '#ffffff' }} />
      </div>
    </div>
  )
}

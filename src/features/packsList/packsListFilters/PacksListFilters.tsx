import React, { FC } from 'react'

import filterRemoveIcon from '../../../assets/image/icons/filter-remove.svg'
import { useAppDispatch } from '../../../bll/store'
import { resetFiltersAC, fetchPacksTC, resetAllFiltersTC } from '../packsListReducer'

import { FilterCountOfItems } from './filterCountOfItems/FilterCountOfItems'
import { FilterMyAllPacks } from './filterMyAllPacks/FilterMyAllPacks'
import s from './PacksListFilters.module.css'
import { SearchPacks } from './searchPacks/SearchPacks'

type PropsType = {}

export const PacksListFilters: FC<PropsType> = props => {
  const dispatch = useAppDispatch()

  const resetFilters = () => {
    dispatch(resetAllFiltersTC())
  }

  return (
    <div className={s.filters}>
      <SearchPacks />
      <FilterMyAllPacks />
      <FilterCountOfItems />
      <div className={s.resetFilterBlock}>
        <button className={s.filterRemoveButton} onClick={resetFilters}>
          <img src={filterRemoveIcon} alt="filter-remove" />
        </button>
      </div>
    </div>
  )
}

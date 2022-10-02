import React, { FC } from 'react'

import filterRemoveIcon from '../../../assets/image/icons/filter-remove.svg'
import { useAppDispatch } from '../../../bll/store'
import { resetFiltersAC, setIsMyPacksAC } from '../packsListReducer'

import { FilterCountOfItems } from './filterCountOfItems/FilterCountOfItems'
import { FilterMyAllPacks } from './filterMyAllPacks/FilterMyAllPacks'
import s from './PacksListFilters.module.css'
import { SearchPacks } from './searchPacks/SearchPacks'

type PropsType = {}

export const PacksListFilters: FC<PropsType> = () => {
  const dispatch = useAppDispatch()

  const onClickButtonRemoveHandler = () => {
    dispatch(resetFiltersAC())
    dispatch(setIsMyPacksAC(false))
  }

  return (
    <div className={s.filters}>
      <SearchPacks />
      <FilterMyAllPacks />
      <FilterCountOfItems />
      <div className={s.resetFilterBlock}>
        <button className={s.filterRemoveButton} onClick={onClickButtonRemoveHandler}>
          <img src={filterRemoveIcon} alt="filter-remove" />
        </button>
      </div>
    </div>
  )
}

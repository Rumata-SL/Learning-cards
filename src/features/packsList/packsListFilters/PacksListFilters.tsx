import React, { FC, useState } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Slider } from '@mui/material'

import filterRemoveIcon from '../../../assets/image/icons/filter-remove.svg'
import { SuperInput } from '../../../common/components/superInput/SuperInput'

import { FilterMyAllPacks } from './filterMyAllPacks/FilterMyAllPacks'
import s from './PacksListFilters.module.css'

type PropsType = {}

export const PacksListFilters: FC<PropsType> = () => {
  const [numberCards, setNumberCards] = useState([2, 10])

  const handleChangeNumberCards = (event: Event, newValue: number | number[]) => {
    setNumberCards(newValue as number[])
  }

  return (
    <div className={s.filters}>
      <div>
        <h3 className={s.filtersTitle}>Search</h3>
        <div className={s.searchInputBlock}>
          <SuperInput placeholder={'Provide your text'} />
          <SearchOutlinedIcon className={s.searchIcon} sx={{ color: '#ffffff' }} />
        </div>
      </div>
      <FilterMyAllPacks />
      <div>
        <h3 className={s.filtersTitle}>Number of cards</h3>
        <div className={s.slider}>
          <div className={s.sliderValue}>{numberCards[0]}</div>
          <Slider value={numberCards} onChange={handleChangeNumberCards} valueLabelDisplay="auto" />
          <div className={s.sliderValue}>{numberCards[1]}</div>
        </div>
      </div>
      <div className={s.resetFilterBlock}>
        <button className={s.filterRemoveButton}>
          <img src={filterRemoveIcon} alt="filter-remove" />
        </button>
      </div>
    </div>
  )
}

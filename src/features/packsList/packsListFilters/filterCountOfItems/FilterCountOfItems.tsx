import React, { FC, useState } from 'react'

import { Slider } from '@mui/material'

import t from '../PacksListFilters.module.css'

import s from './FilterCountOfItems.module.css'

type PropsType = {}

export const FilterCountOfItems: FC<PropsType> = () => {
  const [numberCards, setNumberCards] = useState([2, 10])

  const handleChangeNumberCards = (event: Event, newValue: number | number[]) => {
    setNumberCards(newValue as number[])
  }

  return (
    <div>
      <h3 className={t.filtersTitle}>Number of cards</h3>
      <div className={s.slider}>
        <div className={s.sliderValue}>{numberCards[0]}</div>
        <Slider value={numberCards} onChange={handleChangeNumberCards} valueLabelDisplay="auto" />
        <div className={s.sliderValue}>{numberCards[1]}</div>
      </div>
    </div>
  )
}

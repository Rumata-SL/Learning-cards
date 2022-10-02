import React, { FC, useEffect, useState } from 'react'

import { Slider } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../../bll/store'
import { changeFiltersAC } from '../../packsListReducer'
import t from '../PacksListFilters.module.css'

import s from './FilterCountOfItems.module.css'

type PropsType = {}

export const FilterCountOfItems: FC<PropsType> = () => {
  const dispatch = useAppDispatch()
  const minCardsCount = useAppSelector(state => state.packsList.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packsList.maxCardsCount)
  const [numberCards, setNumberCards] = useState([minCardsCount, maxCardsCount])

  const handleChangeNumberCards = (
    event: React.SyntheticEvent | Event,
    value: number | Array<number>
  ) => {
    setNumberCards(value as number[])
  }

  useEffect(() => {
    dispatch(changeFiltersAC({ min: numberCards[0], max: numberCards[1] }))
  }, [numberCards])

  return (
    <div>
      <h3 className={t.filtersTitle}>Number of cards</h3>
      <div className={s.slider}>
        <div className={s.sliderValue}>{numberCards[0]}</div>
        <Slider
          value={numberCards}
          onChangeCommitted={handleChangeNumberCards}
          valueLabelDisplay="auto"
        />
        <div className={s.sliderValue}>{numberCards[1]}</div>
      </div>
    </div>
  )
}

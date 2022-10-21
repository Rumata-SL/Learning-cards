import React, { FC } from 'react'

import { Slider } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../../bll/store'
import {
  selectPackListMaxCardsCount,
  selectPackListMinCardsCount,
} from '../../../../utils/selectors/selectors'
import { changeFiltersAC } from '../../packsListReducer'
import t from '../PacksListFilters.module.css'

import s from './FilterCountOfItems.module.css'

type PropsType = {}

export const FilterCountOfItems: FC<PropsType> = () => {
  const dispatch = useAppDispatch()
  const minCardsCount = useAppSelector(selectPackListMinCardsCount)
  const maxCardsCount = useAppSelector(selectPackListMaxCardsCount)

  const handleChangeNumberCards = (
    event: React.SyntheticEvent | Event,
    value: number | Array<number>
  ) => {
    const numberCards = value as number[]

    dispatch(changeFiltersAC({ min: numberCards[0], max: numberCards[1] }))
  }

  return (
    <div>
      <h3 className={t.filtersTitle}>Number of cards</h3>
      <div className={s.slider}>
        <div className={s.sliderValue}>{minCardsCount}</div>
        <Slider
          value={[minCardsCount, maxCardsCount] as number[]}
          onChangeCommitted={handleChangeNumberCards}
          valueLabelDisplay="auto"
        />
        <div className={s.sliderValue}>{maxCardsCount}</div>
      </div>
    </div>
  )
}

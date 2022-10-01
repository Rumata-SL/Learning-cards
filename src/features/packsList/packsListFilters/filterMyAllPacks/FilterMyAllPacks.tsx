import React, { FC, useEffect } from 'react'

import { Button, ButtonGroup } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../../bll/store'
import { changeFilterMyAllAC, packsListTC, setFilterPacksAC } from '../../packsListReducer'
import t from '../PacksListFilters.module.css'

import s from './FilterMyAllPacks.module.css'

type PropsType = {}

export const FilterMyAllPacks: FC<PropsType> = props => {
  const dispatch = useAppDispatch()
  const isMy = useAppSelector(state => state.packsList.isMyDeck)
  const profileId = useAppSelector(state => state.profile.profile._id)

  const setAllHandler = () => {
    if (isMy === true) {
      dispatch(setFilterPacksAC(false))
      dispatch(changeFilterMyAllAC(''))
    }
  }

  const setMyHandler = () => {
    if (isMy !== true) {
      dispatch(setFilterPacksAC(true))
      dispatch(changeFilterMyAllAC(profileId))
    }
  }

  return (
    <div>
      <h3 className={t.filtersTitle}>Show packs cards</h3>
      <div className={s.buttonsMyAll}>
        <ButtonGroup className={s.buttonMyAllGroup}>
          <Button onClick={setMyHandler} variant={isMy ? 'contained' : 'outlined'}>
            My
          </Button>
          <Button onClick={setAllHandler} variant={isMy ? 'outlined' : 'contained'}>
            All
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

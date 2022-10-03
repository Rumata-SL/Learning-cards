import React, { FC } from 'react'

import { Button, ButtonGroup } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../../bll/store'
import { changeFiltersAC, setIsMyPacksAC } from '../../packsListReducer'
import t from '../PacksListFilters.module.css'

import s from './FilterMyAllPacks.module.css'

type PropsType = {}

export const FilterMyAllPacks: FC<PropsType> = props => {
  const dispatch = useAppDispatch()
  const isMyPack = useAppSelector(state => state.packsList.isMyPack)
  const profileId = useAppSelector(state => state.profile.profile._id)

  const setAllHandler = () => {
    if (isMyPack === true) {
      dispatch(setIsMyPacksAC(false))
      dispatch(changeFiltersAC({ user_id: '' }))
    }
  }

  const setMyHandler = () => {
    if (isMyPack !== true) {
      dispatch(setIsMyPacksAC(true))
      dispatch(changeFiltersAC({ user_id: profileId }))
    }
  }

  return (
    <div>
      <h3 className={t.filtersTitle}>Show packs cards</h3>
      <div className={s.buttonsMyAll}>
        <ButtonGroup className={s.buttonMyAllGroup}>
          <Button onClick={setMyHandler} variant={isMyPack ? 'contained' : 'outlined'}>
            My
          </Button>
          <Button onClick={setAllHandler} variant={isMyPack ? 'outlined' : 'contained'}>
            All
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

import React from 'react'

import { NavLink } from 'react-router-dom'

import arrowIcon from '../../../assets/image/icons/arrow.svg'
import { PATH } from '../../enum/path'

import s from './BackToPackList.module.css'

export const BackToPackList = () => {
  return (
    <NavLink to={PATH.PACKS_LIST}>
      <div className={s.back}>
        <img src={arrowIcon} alt="back" />
        <span>Back to Packs List</span>
      </div>
    </NavLink>
  )
}

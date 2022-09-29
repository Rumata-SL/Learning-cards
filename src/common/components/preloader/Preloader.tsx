import React from 'react'

import { CircularProgress } from '@mui/material'

import style from './Preloader.module.css'

export const Preloader = () => {
  return (
    <div className={style.preloader}>
      <CircularProgress />
    </div>
  )
}

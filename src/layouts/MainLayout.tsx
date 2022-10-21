import React from 'react'

import { LinearProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { useAppSelector } from '../bll/store'
import { ErrorBar } from '../common/components/errorBar/ErrorBar'
import { Header } from '../common/components/header/Header'
import { Navbar } from '../common/components/nav/Navbar'
import { selectAppStatus } from '../utils/selectors/selectors'

export const MainLayout = () => {
  const appStatus = useAppSelector(selectAppStatus)

  return (
    <div>
      <div className="app">
        <Header />
        <div className="linearProgress">{appStatus === 'loading' && <LinearProgress />}</div>
        <div className="app-wrapper">
          <Outlet />
        </div>
        <ErrorBar />
        {/*<Navbar />*/}
      </div>
    </div>
  )
}

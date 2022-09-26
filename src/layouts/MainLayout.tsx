import React from 'react'
import { Header } from '../common/components/header/Header'
import { LinearProgress } from '@mui/material'
import { ErrorBar } from '../common/components/errorBar/ErrorBar'
import { Navbar } from '../common/components/nav/Navbar'
import { useAppSelector } from '../bll/store'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  const appStatus = useAppSelector(state => state.app.status)
  return (
    <div>
      <div className="app">
        <Header />
        <div className="linearProgress">{appStatus === 'loading' && <LinearProgress />}</div>
        <div className="app-wrapper">
          <Outlet />
        </div>
        <ErrorBar />
        <Navbar />
      </div>
    </div>
  )
}

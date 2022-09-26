import './App.css'
import React, { useEffect } from 'react'

import { CircularProgress, LinearProgress } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../bll/store'
import { ErrorBar } from '../common/components/errorBar/ErrorBar'
import { Header } from '../common/components/header/Header'
import { Navbar } from '../common/components/nav/Navbar'

import { authMeTC } from './appReducer'
import { Pages } from './Pages'

function App() {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.status)
  const isInitialized = useAppSelector(state => state.app.isInitial)
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) return
    dispatch(authMeTC())
  }, [])

  if (!isInitialized) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <div className="linearProgress">{appStatus === 'loading' && <LinearProgress />}</div>
      <div className="app-wrapper">
        <Pages />
      </div>
      <ErrorBar />
      <Navbar />
    </div>
  )
}

export default App

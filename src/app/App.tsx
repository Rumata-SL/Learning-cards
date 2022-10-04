import './App.css'
import React, { useEffect, Suspense, lazy } from 'react'

import { LinearProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../bll/store'
import { Preloader } from '../common/components/preloader/Preloader'
import { PATH } from '../common/enum/path'
import { Login } from '../features/auth/login/Login'
import { Learn } from '../features/learn/Learn'
import { Pack } from '../features/packsList/pack/Pack'
import { PacksList } from '../features/packsList/PacksList'
import { Profile } from '../features/profile/Profile'
import { MainLayout } from '../layouts/MainLayout'

import { authMeTC } from './appReducer'

const Registration = lazy(
  () => import(/*webpackChunkName: "Registration"*/ '../features/auth/registration/Registration')
)
const Recovery = lazy(
  () => import(/*webpackChunkName: "Recovery"*/ '../features/auth/recovery/Recovery')
)
const NewPassword = lazy(
  () => import(/*webpackChunkName: "NewPassword"*/ '../features/auth/newPassword/NewPassword')
)
const ErrorComponent = lazy(
  () =>
    import(/*webpackChunkName: "ErrorComponent"*/ '../common/components/errorFolder/ErrorComponent')
)

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitial)
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) return
    dispatch(authMeTC())
  }, [])

  if (!isInitialized) {
    return <Preloader />
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Navigate to={PATH.PACKS_LIST} />} />
        <Route path={PATH.PROFILE} element={<Profile />}></Route>
        <Route
          path={PATH.REGISTRATION}
          element={
            <Suspense
              fallback={
                <div className="linearProgress">
                  <LinearProgress />
                </div>
              }
            >
              <Registration />
            </Suspense>
          }
        ></Route>
        <Route path={PATH.LOGIN} element={<Login />}></Route>
        <Route
          path={PATH.RECOVERY}
          element={
            <Suspense
              fallback={
                <div className="linearProgress">
                  <LinearProgress />
                </div>
              }
            >
              <Recovery />
            </Suspense>
          }
        ></Route>
        <Route
          path={PATH.NEW_PASSWORD}
          element={
            <Suspense
              fallback={
                <div className="linearProgress">
                  <LinearProgress />
                </div>
              }
            >
              <NewPassword />
            </Suspense>
          }
        ></Route>
        <Route path={PATH.PACKS_LIST} element={<PacksList />}></Route>
        <Route path={PATH.PACK} element={<Pack />}></Route>
        <Route path={PATH.LEARN} element={<Learn />}></Route>
        <Route
          path={'/*'}
          element={
            <Suspense
              fallback={
                <div className="linearProgress">
                  <LinearProgress />
                </div>
              }
            >
              <ErrorComponent />
            </Suspense>
          }
        ></Route>
      </Route>
    </Routes>
  )
}

export default App

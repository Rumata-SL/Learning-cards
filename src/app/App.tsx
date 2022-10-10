import './App.css'
import React, { useEffect, Suspense, lazy } from 'react'

import { LinearProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../bll/store'
import { Preloader } from '../common/components/preloader/Preloader'
import { PATH } from '../common/enum/path'
import { MainLayout } from '../layouts/MainLayout'

import { authMeTC } from './appReducer'

const Profile = lazy(() => import(/*webpackChunkName: "Profile"*/ '../features/profile/Profile'))
const Login = lazy(() => import(/*webpackChunkName: "Login"*/ '../features/auth/login/Login'))
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
const PacksList = lazy(
  () => import(/*webpackChunkName: "PacksList"*/ '../features/packsList/PacksList')
)
const Pack = lazy(() => import(/*webpackChunkName: "Pack"*/ '../features/packsList/pack/Pack'))
const Learn = lazy(() => import(/*webpackChunkName: "Learn"*/ '../features/learn/Learn'))

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
        <Route
          path={PATH.PROFILE}
          element={
            <Suspense
              fallback={
                <div className="linearProgress">
                  <LinearProgress />
                </div>
              }
            >
              <Profile />
            </Suspense>
          }
        ></Route>
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
        <Route
          path={PATH.LOGIN}
          element={
            <Suspense
              fallback={
                <div className="linearProgress">
                  <LinearProgress />
                </div>
              }
            >
              <Login />
            </Suspense>
          }
        ></Route>
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
        <Route
          path={PATH.PACKS_LIST}
          element={
            <Suspense
              fallback={
                <div className="linearProgress">
                  <LinearProgress />
                </div>
              }
            >
              <PacksList />
            </Suspense>
          }
        ></Route>
        <Route
          path={PATH.PACK}
          element={
            <Suspense
              fallback={
                <div className="linearProgress">
                  <LinearProgress />
                </div>
              }
            >
              <Pack />
            </Suspense>
          }
        ></Route>
        <Route
          path={PATH.LEARN}
          element={
            <Suspense
              fallback={
                <div className="linearProgress">
                  <LinearProgress />
                </div>
              }
            >
              <Learn />
            </Suspense>
          }
        ></Route>
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

import './App.css'
import React, { useEffect, Suspense, lazy } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../bll/store'
import { Preloader } from '../common/components/preloader/Preloader'
import { PATH } from '../common/enum/path'
import { Login } from '../features/auth/login/Login'
// import Registration from '../features/auth/registration/Registration'
// import NewPassword from '../features/auth/newPassword/NewPassword'
// import Recovery from '../features/auth/recovery/Recovery'
// import ErrorComponent from '../common/components/errorFolder/ErrorComponent'
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
        <Route path="/" element={<Navigate to={PATH.PROFILE} />} />
        <Route path={PATH.PROFILE} element={<Profile />}></Route>
        {/*<Route path={PATH.REGISTRATION} element={<Registration />}></Route>*/}
        <Route
          path={PATH.REGISTRATION}
          element={
            <Suspense fallback={<Preloader />}>
              <Registration />
            </Suspense>
          }
        ></Route>
        <Route path={PATH.LOGIN} element={<Login />}></Route>
        {/*<Route path={PATH.RECOVERY} element={<Recovery />}></Route>*/}
        <Route
          path={PATH.RECOVERY}
          element={
            <Suspense fallback={<Preloader />}>
              <Recovery />
            </Suspense>
          }
        ></Route>

        {/*<Route path={PATH.NEW_PASSWORD} element={<NewPassword />}></Route>*/}
        <Route
          path={PATH.NEW_PASSWORD}
          element={
            <Suspense fallback={<Preloader />}>
              <NewPassword />
            </Suspense>
          }
        ></Route>
        <Route path={PATH.PACKS_LIST} element={<PacksList />}></Route>
        <Route path={PATH.PACK} element={<Pack />}></Route>
        <Route
          path={'/*'}
          element={
            <Suspense fallback={<Preloader />}>
              <ErrorComponent />
            </Suspense>
          }
        ></Route>
        {/*<Route path={'/*'} element={<ErrorComponent />}></Route>*/}

        {/*<Route path={PATH.REGISTRATION} element={
          <Suspense fallback={
            <Preloader />}><Registration/></Suspense>}></Route>*/}
      </Route>
    </Routes>
  )
}

export default App

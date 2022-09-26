import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { ErrorComponent } from '../common/components/errorFolder/ErrorComponent'
import { PATH } from '../common/enum/path'
import { Login } from '../features/auth/login/Login'
import { NewPassword } from '../features/auth/newPassword/NewPassword'
import { Recovery } from '../features/auth/recovery/Recovery'
import { Registration } from '../features/auth/registration/Registration'
import { Pack } from '../features/packsList/pack/Pack'
import { PacksList } from '../features/packsList/PacksList'
import { Profile } from '../features/profile/Profile'

export const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Navigate to={PATH.PROFILE} />} />
        <Route path={PATH.PROFILE} element={<Profile />}></Route>
        <Route path={PATH.REGISTRATION} element={<Registration />}></Route>
        <Route path={PATH.LOGIN} element={<Login />}></Route>
        <Route path={PATH.RECOVERY} element={<Recovery />}></Route>
        <Route path={PATH.NEW_PASSWORD} element={<NewPassword />}></Route>
        <Route path={PATH.PACKS_LIST} element={<PacksList />}></Route>
        <Route path={PATH.PACK} element={<Pack />}></Route>
        <Route path={'/*'} element={<ErrorComponent />}></Route>
      </Routes>
    </div>
  )
}

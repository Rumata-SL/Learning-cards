import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AppActionType, appReducer } from '../app/appReducer'
import { LoginActionType, loginReducer } from '../features/auth/login/loginReducer'
import {
  NewPasswordActionType,
  newPasswordReducer,
} from '../features/auth/newPassword/newPasswordReducer'
import { RecoveryActionType, recoveryReducer } from '../features/auth/recovery/recoveryReducer'
import {
  RegisteredActionType,
  registrationReducer,
} from '../features/auth/registration/registrationReducer'
import { PackActionType, packReducer } from '../features/packsList/pack/packReducer'
import { PacksListActionType, packsListReducer } from '../features/packsList/packsListReducer'
import { ProfileActionType, profileReducer } from '../features/profile/profileReducer'

const rootReducer = combineReducers({
  app: appReducer,
  profile: profileReducer,
  login: loginReducer,
  newPassword: newPasswordReducer,
  registration: registrationReducer,
  recovery: recoveryReducer,
  packsList: packsListReducer,
  pack: packReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>

export type AppRootActionsType =
  | LoginActionType
  | RegisteredActionType
  | RecoveryActionType
  | NewPasswordActionType
  | ProfileActionType
  | AppActionType
  | PacksListActionType
  | PackActionType

export type ThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AppRootActionsType
>

export type DispatchActionType = ThunkDispatch<AppStateType, unknown, AppRootActionsType>
export const useAppDispatch = () => useDispatch<DispatchActionType>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

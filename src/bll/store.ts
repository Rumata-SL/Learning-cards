import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { LoginActionType, loginReducer } from '../features/login/loginReducer'
import {
    ProfileActionType,
    profileReducer,
} from '../features/profile/profileReducer'
import {
    newPasswordActionType,
    newPasswordReducer,
} from '../features/newPassword/newPasswordReducer'
import {
    RegisteredActionType,
    registrationReducer,
} from '../features/registration/registrationReducer'
import {
    RecoveryActionType,
    recoveryReducer,
} from '../features/recovery/recoveryReducer'
import {AppActionType, appReducer} from "../app/appReducer"
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    login: loginReducer,
    newPassword: newPasswordReducer,
    registration: registrationReducer,
    recovery: recoveryReducer,
})

export const store = legacy_createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
)

export type AppStateType = ReturnType<typeof rootReducer>

export type AppRootActionsType =
    | LoginActionType
    | RegisteredActionType
    | RecoveryActionType
    | newPasswordActionType
    | ProfileActionType
    |AppActionType// your actionType

export type ThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    AppRootActionsType
    >

export type DispatchActionType = ThunkDispatch<
    AppStateType,
    unknown,
    AppRootActionsType
    >
export const useAppDispatch = () => useDispatch<DispatchActionType>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "../feautures/profile/profileReducer";
import {LoginActionType, loginReducer} from "../feautures/login/loginReducer";
import {newPasswordReducer} from "../feautures/newPassword/newPasswordReducer";
import {
    RegisteredActionType,
    registrationReducer
} from "../feautures/registration/registrationReducer";
import {recoveryReducer} from "../feautures/recovery/recoveryReducer";

import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../app/appReducer";


const rootReducer = combineReducers({
    app:appReducer,
    profile: profileReducer,
    login: loginReducer,
    newPassword: newPasswordReducer,
    registration: registrationReducer,
    recovery:recoveryReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>


export type AppRootActionsType = LoginActionType | RegisteredActionType // your actionType
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppRootActionsType>

export type DispatchActionType = ThunkDispatch<AppStateType, unknown, AppRootActionsType>

export const useAppDispatch = () => useDispatch<DispatchActionType>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector


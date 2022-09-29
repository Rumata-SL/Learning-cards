import { AxiosError } from 'axios'

import { authAPI } from '../api/auth/authAPI'
import { ThunkType } from '../bll/store'
import { loginAC } from '../features/auth/login/loginReducer'
import { packsListTC } from '../features/packsList/packsListReducer'
import { setProfileAC } from '../features/profile/profileReducer'

//initial state
type InitialStateType = typeof initialState

const initialState = {
  status: 'idle' as LoadingStatusType,
  isInitial: false,
  error: null as null | string,
}

//reducer
export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionType
): InitialStateType => {
  switch (action.type) {
    case 'app/SET-STATUS':
      return { ...state, status: action.status }
    case 'app/SET-IS-INITIALIZED':
      return { ...state, isInitial: action.value }
    case 'app/SET-ERROR':
      return { ...state, error: action.error }
    default:
      return state
  }
}

//AC
export const setAppStatusAC = (status: LoadingStatusType) => {
  return {
    type: 'app/SET-STATUS',
    status,
  } as const
}

export const setAppInitializedAC = (value: boolean) => {
  return {
    type: 'app/SET-IS-INITIALIZED',
    value,
  } as const
}

export const setAppErrorAC = (error: null | string) => {
  return {
    type: 'app/SET-ERROR',
    error,
  } as const
}

//TC
export const authMeTC = (): ThunkType => async dispatch => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await authAPI.authMe()

    dispatch(setProfileAC(res.data))
    dispatch(loginAC(true))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    dispatch(loginAC(false))
  } finally {
    dispatch(setAppStatusAC('idle'))
    dispatch(setAppInitializedAC(true))
  }
}

//types
export type AppActionType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppInitializedAC>
  | ReturnType<typeof setAppErrorAC>

export type LoadingStatusType = 'idle' | 'loading' | 'succeeded'

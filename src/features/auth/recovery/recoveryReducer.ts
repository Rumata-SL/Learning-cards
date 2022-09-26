import { AxiosError } from 'axios'

import { recoverAPI } from '../../../api/auth/recoveryAPI'
import { setAppStatusAC } from '../../../app/appReducer'
import { ThunkType } from '../../../bll/store'
import { utilsError } from '../../../utils/utils_error'

//initial state
type InitialStateType = typeof initialState

const initialState = {
  isRequested: false,
  error: null as string | null,
}

//reducer
export const recoveryReducer = (
  state: InitialStateType = initialState,
  action: RecoveryActionType
): InitialStateType => {
  switch (action.type) {
    case 'recovery/SET-IS-REQUESTED': {
      return { ...state, isRequested: action.status }
    }
    case 'recovery/SET-RECOVERY-ERROR': {
      return { ...state, error: action.error }
    }
    default:
      return state
  }
}

//AC
export const setIsRequestedAC = (status: boolean) => {
  return {
    type: 'recovery/SET-IS-REQUESTED',
    status,
  } as const
}

export const setRecoveryErrorAC = (error: string | null) => {
  return {
    type: 'recovery/SET-RECOVERY-ERROR',
    error,
  } as const
}

//TC
export const requestRecoveryTC =
  (email: string): ThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const req = await recoverAPI.requestLink(email)

      if (req.data.success) {
        dispatch(setIsRequestedAC(true))
        dispatch(setAppStatusAC('succeeded'))
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      utilsError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

//types
export type RecoveryActionType =
  | ReturnType<typeof setIsRequestedAC>
  | ReturnType<typeof setRecoveryErrorAC>

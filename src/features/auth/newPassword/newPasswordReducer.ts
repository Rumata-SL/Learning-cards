import { AxiosError } from 'axios'

import { recoverAPI } from '../../../api/auth/recoveryAPI'
import { setAppStatusAC } from '../../../app/appReducer'
import { ThunkType } from '../../../bll/store'
import { utilsError } from '../../../utils/utils_error'

//initial state
type InitialStateType = typeof initialState

const initialState = {
  isCreated: false,
}

//reducer
export const newPasswordReducer = (
  state: InitialStateType = initialState,
  action: NewPasswordActionType
): InitialStateType => {
  switch (action.type) {
    case 'newPassword/SET-IS-CREATED': {
      return { ...state, isCreated: action.status }
    }
    default:
      return state
  }
}

//AC
const setIsCreatedAC = (status: boolean) => {
  return {
    type: 'newPassword/SET-IS-CREATED',
    status,
  } as const
}

//TC
export const createNewPasswordTC =
  (newPassword: string, token: string): ThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))

      const res = await recoverAPI.setNewPassword(newPassword, token)

      if (res.data.info === 'setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—') {
        dispatch(setIsCreatedAC(true))
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
export type NewPasswordActionType = ReturnType<typeof setIsCreatedAC>

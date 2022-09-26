import { AxiosError } from 'axios'

import { ProfileType } from '../../api/auth/authAPI'
import { EditMeArgsType, profileAPI } from '../../api/profileAPI'
import { authMeTC, setAppStatusAC } from '../../app/appReducer'
import { AppRootActionsType, ThunkType } from '../../bll/store'
import { utilsError } from '../../utils/utils_error'

//initial state
type InitialStateType = typeof initialState

const initialState = {
  profile: {} as ProfileType,
}

//reducer
export const profileReducer = (
  state = initialState,
  action: AppRootActionsType
): InitialStateType => {
  switch (action.type) {
    case 'profile/SET_PROFILE':
      return { ...state, profile: action.profile }
    default:
      return state
  }
}

//AC
export const setProfileAC = (profile: ProfileType) => {
  return {
    type: 'profile/SET_PROFILE',
    profile,
  } as const
}

//TC
export const updateProfileTC =
  (args: EditMeArgsType): ThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await profileAPI.editMe(args)

      if (res) {
        dispatch(authMeTC())
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      utilsError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

//types
export type ProfileActionType = ReturnType<typeof setProfileAC>

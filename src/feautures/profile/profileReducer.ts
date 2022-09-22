import { AxiosError } from 'axios'
import { EditMeArgsType, profileAPI } from '../../api/profileAPI'
import { setAppStatusAC } from '../../app/appReducer'
import { AppRootActionsType, ThunkType } from '../../bll/store'
import { utilsError } from '../../utils/utils_error'
import {authAPI, ProfileType} from "../../api/authAPI";

//reducer
const initialState: InitialStateType = {
	profile: null,
}
export const profileReducer = (
	state = initialState,
	action: AppRootActionsType
) => {
	switch (action.type) {
		case 'profile/SET_PROFILE':
			return { ...state, profile: action.profile }
		default:
			return state
	}
}

//action
const setProfileAC = (profile: ProfileType) => {
	return {
		type: 'profile/SET_PROFILE',
		profile,
	} as const
}

//thunk
export const getProfileTC = (): ThunkType => async dispatch => {
	dispatch(setAppStatusAC('loading'))
	try {
		const res = await authAPI.authMe()
		dispatch(setProfileAC(res.data))
	} catch (e) {
		const err = e as Error | AxiosError<{ error: string }>
		utilsError(err, dispatch)
	} finally {
		dispatch(setAppStatusAC('idle'))
	}
}

export const updateProfileTC =
	(args: EditMeArgsType): ThunkType =>
	async dispatch => {
		dispatch(setAppStatusAC('loading'))
		try {
			const res = await profileAPI.editMe(args)
			dispatch(getProfileTC())
		} catch (e) {
			const err = e as Error | AxiosError<{ error: string }>
			utilsError(err, dispatch)
		} finally {
			dispatch(setAppStatusAC('idle'))
		}
	}

//type
type InitialStateType = {
	profile: null | ProfileType
}

export type ProfileActionType = ReturnType<typeof setProfileAC>

import { EditMeArgsType, profileAPI, ProfileType } from '../../api/profileAPI'
import { AppRootActionsType, ThunkType } from '../../bll/store'

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
	const res = await profileAPI.getMe()
	dispatch(setProfileAC(res.data))
}

export const updateProfileTC =
	(args: EditMeArgsType): ThunkType =>
	async dispatch => {
		const res = await profileAPI.editMe(args)
		dispatch(getProfileTC())
	}

//type
type InitialStateType = {
	profile: null | ProfileType
}

export type ProfileActionType = ReturnType<typeof setProfileAC>

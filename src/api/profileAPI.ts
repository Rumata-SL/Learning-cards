import { instance } from './instance'

export const profileAPI = {
	getMe() {
		return instance.post<ProfileType>('/auth/me')
	},
	editMe(args: EditMeArgsType) {
		return instance.put<EditMeArgsType, EditMeResponseType>('/auth/me', args)
	},
}

//type
export type ProfileType = {
	_id: string
	email: string
	rememberMe: boolean
	isAdmin: boolean
	name: string
	verified: boolean
	publicCardPacksCount: number
	created: string
	updated: string
	__v: number
	token: string
	tokenDeathTime: number
	avatar: string
}

export type EditMeArgsType = {
	name?: string
	avatar?: string
}

export type EditMeResponseType = {
	updatedUser: ProfileType
	error?: string
}

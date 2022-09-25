import { instance } from '../instance'
import { AxiosResponse } from 'axios'

export const authAPI = {
	authMe() {
		return instance.post<{}, AxiosResponse<ProfileType>>('/auth/me')
	},
	login(email: string, password: string, rememberMe: boolean) {
		return instance.post<LoginParamsType, AxiosResponse<ProfileType>>(`/auth/login`, {
			email,
			password,
			rememberMe,
		})
	},
	logout() {
		return instance.delete<{}, AxiosResponse<LogoutType>>('/auth/me')
	},
}

export type LoginParamsType = {
	email: string
	password: string
	rememberMe?: boolean
}

export type LogoutType = {
	info: string
	error?: string
}

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

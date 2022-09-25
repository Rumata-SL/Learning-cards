import { instance } from './instance'
import {ProfileType} from "./auth/authAPI";
import {AxiosResponse} from "axios";

export const profileAPI = {
	editMe(args: EditMeArgsType) {
		return instance.put<EditMeArgsType, AxiosResponse<EditMeResponseType>>('/auth/me', args)
	},
}

//type
export type EditMeArgsType = {
	name?: string
	avatar?: string
}

export type EditMeResponseType = {
	updatedUser: ProfileType
	error?: string
}

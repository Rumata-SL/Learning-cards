import { AxiosResponse } from 'axios'

import { ProfileType } from './auth/authAPI'
import { instance } from './instance'

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

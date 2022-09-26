import { AxiosResponse } from 'axios'

import { instance } from '../instance'

export const registerAPI = {
  register(registeredData: RegisterParamsType) {
    return instance.post<RegisterParamsType, AxiosResponse<any>>('/auth/register', registeredData)
  },
}

export type RegisterParamsType = {
  email: string
  password: string
}

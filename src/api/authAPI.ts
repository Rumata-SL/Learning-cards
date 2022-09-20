import {instance} from './instance';
import {AxiosResponse} from "axios";

export const authAPI = {
    authMe() {
        return instance.post<{}, AxiosResponse<any>>('/auth/me')
    },
    login(email: string,
          password: string,
          rememberMe: boolean){
        return instance.post<LoginParamsType,any>(`/auth/login`,{email, password, rememberMe})
    }

}

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe?: boolean
}
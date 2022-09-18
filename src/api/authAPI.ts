import {instance} from './instance';

export const authAPI = {
    authMe() {

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
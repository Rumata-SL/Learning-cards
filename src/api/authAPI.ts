import {instance} from './instance';
import {AxiosResponse} from "axios";

export const authAPI = {
    authMe() {
        return instance.post<{}, AxiosResponse<any>>('/auth/me')
    },

}
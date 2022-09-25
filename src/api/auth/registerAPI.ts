import {instance} from '../instance';
import {AxiosResponse} from "axios";

export const registerAPI = {
    register(registeredData:RegisterParamsType){
       return instance.post<RegisterParamsType, AxiosResponse<any>>('/auth/register', registeredData);
    }
}

export type RegisterParamsType = {
    email:string
    password:string
}
import {ThunkType} from "../../bll/store";
import {registerAPI, RegisterParamsType} from "../../api/registerAPI";
import {AxiosError} from "axios";


type InitialStateType = {
    isRegistered: boolean
}

const initialState = {
    isRegistered: false
}

export const registrationReducer = (state: InitialStateType = initialState, action: RegisteredActionType) => {
    switch (action.type) {
        case "register/IS-COMPLETED":
            return {...state, isRegistered: action.isRegistered}
        default:
            return state
    }
}

const registrationAC = (isRegistered: boolean) => ({
    type: "register/IS-COMPLETED",
    isRegistered
} as const)

export const registerTC = (registeredData:RegisterParamsType): ThunkType => async dispatch => {
    try {
        const {status} = await registerAPI.register(registeredData)
        dispatch(registrationAC(true))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>

    } finally {

    }
}

export type RegisteredActionType = ReturnType<typeof registrationAC>
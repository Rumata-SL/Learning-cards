import {AxiosError} from "axios";
import {ThunkType} from "../../../bll/store";
import {utilsError} from "../../../utils/utils_error";
import {setAppStatusAC} from "../../../app/appReducer";
import {registerAPI, RegisterParamsType} from "../../../api/auth/registerAPI";

//initial state
type InitialStateType = typeof initialState

const initialState = {
    isRegistered: false
}

//reducer
export const registrationReducer = (state: InitialStateType = initialState, action: RegisteredActionType): InitialStateType => {
    switch (action.type) {
        case "register/IS-COMPLETED":
            return {...state, isRegistered: action.isRegistered}
        default:
            return state
    }
}

//AC
const registrationAC = (isRegistered: boolean) => ({
    type: "register/IS-COMPLETED",
    isRegistered
} as const)

//TC
export const registerTC = (registeredData: RegisterParamsType): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatusAC("loading"));
        const {status} = await registerAPI.register(registeredData)
        if (status) {
            dispatch(registrationAC(true))
        }
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        utilsError(err, dispatch)
    } finally {
        dispatch(setAppStatusAC("succeeded"));
    }
}

//types
export type RegisteredActionType = ReturnType<typeof registrationAC>
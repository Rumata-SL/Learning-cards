import { ThunkType} from "../../bll/store";
import {recoverAPI} from "../../api/recoveryAPI";
import {AxiosError} from "axios";
import {setAppStatusAC} from "../../app/appReducer";
import {utilsError} from "../../utils/utils_error";

type InitialStateType = {
    isRequested: boolean,
    error: string | null
}

export type RecoveryActionType =
    ReturnType<typeof setIsRequestedAC>
    | ReturnType<typeof setRecoveryErrorAC>

const initialState: InitialStateType = {
    isRequested: false,
    error: null
}

export const recoveryReducer = (state: InitialStateType = initialState, action: RecoveryActionType): InitialStateType => {
    switch (action.type) {
        case "recovery/SET-IS-REQUESTED": {
            return {...state, isRequested: action.status}
        }

        case "recovery/SET-RECOVERY-ERROR": {
            return {...state, error: action.error}
        }

        default:
            return state
    }
}

export const setIsRequestedAC = (status: boolean) => {
    return {
        type: "recovery/SET-IS-REQUESTED",
        status
    } as const
}

export const setRecoveryErrorAC = (error: string | null) => {
    return {
        type: "recovery/SET-RECOVERY-ERROR",
        error
    } as const
}


export const requestRecoveryTC = (email: string): ThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        const req = await recoverAPI.requestLink(email)
        if (req.data.success) {
            dispatch(setIsRequestedAC(true))
            dispatch(setAppStatusAC("succeeded"))
        }
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        utilsError(err, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

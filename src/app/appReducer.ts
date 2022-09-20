import {ThunkType} from "../bll/store";
import {AxiosError} from "axios";
import {authAPI} from "../api/authAPI";

const initialState: InitialStateType = {
    status: "idle",
    isInitial: false,
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case "app/SET-STATUS":
            return {...state, status: action.status};
        case "app/SET-IS-INITIALIZED":
            return {...state, isInitial: action.value}
        case "app/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export type AppActionType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppInitializedAC>
    | ReturnType<typeof setAppErrorAC>

export const setAppStatusAC = (status: LoadingStatusType) => {
    return {
        type: "app/SET-STATUS",
        status
    } as const
}

export const setAppInitializedAC = (value: boolean) => {
    return {
        type: "app/SET-IS-INITIALIZED",
        value
    } as const
}
export const setAppErrorAC = (error: null | string) => {
    return {
        type: "app/SET-ERROR",
        error
    } as const
}

const authMeTC = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatusAC("loading"))
        const res = await authAPI.authMe()
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
    } finally {

    }
}


export type LoadingStatusType = "idle" | "loading" | "succeeded"

type InitialStateType = {
    status: LoadingStatusType
    isInitial: boolean
    error: null | string
}
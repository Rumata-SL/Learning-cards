import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {setAppErrorAC} from "../app/appReducer";

export const utilsError = (e: Error | AxiosError<{ error: string }>, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
    }
}
import {DispatchActionType, ThunkType} from '../../bll/store';
import {recoverAPI} from '../../api/recoveryAPI';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;

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
        case 'recovery/SET-IS-REQUESTED': {
            return {...state, isRequested: action.status}
        }

        case 'recovery/SET-RECOVERY-ERROR': {
            return {...state, error: action.error}
        }

        default:
            return state
    }
}

export const setIsRequestedAC = (status: boolean) => {
    return {
        type: 'recovery/SET-IS-REQUESTED',
        status
    } as const
}

export const setRecoveryErrorAC = (error: string | null) => {
    return {
        type: 'recovery/SET-RECOVERY-ERROR',
        error
    } as const
}


export const requestRecoveryTC = (email: string): ThunkType => async (dispatch) => {
    try {
        const req = await recoverAPI.requestLink(email)

        if (req.data.success) {
            dispatch(setIsRequestedAC(true))
        } else {

        }

    } catch (e) {

        if (axios.isAxiosError(e)) {
            const serverError = e as AxiosError<any>;
            if (serverError && serverError.response) {
                dispatch(setRecoveryErrorAC(serverError.response.data.error))
            }
        } else {
            throw new Error('different error than axios');
        }
    }
}

import {DispatchActionType, ThunkType} from '../../bll/store';

type InitialStateType = {
    isRequested: boolean
}

export type RecoveryActionType = ReturnType<typeof setIsRequestedAC>

const initialState: InitialStateType = {
    isRequested: false
}

export const recoveryReducer = (state: InitialStateType = initialState, action: RecoveryActionType): InitialStateType => {
    switch (action.type) {
        case 'recovery/SET-IS-REQUESTED': {
            return {...state, isRequested: action.status}
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


export const requestRecoveryTC = (): ThunkType => (dispatch) => {
    dispatch(setIsRequestedAC(true))
}

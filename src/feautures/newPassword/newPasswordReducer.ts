import {ThunkType} from '../../bll/store';

type newPasswordInitialStateType = {}

export type newPasswordActionType = ReturnType<typeof newPasswordAC>

const initialState: newPasswordInitialStateType = {}

export const newPasswordReducer = (state: newPasswordInitialStateType = initialState, action: newPasswordActionType): newPasswordInitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

const newPasswordAC = () => {
    return {
        type: 'NEW-LOGIN'
    } as const
}


export const testTC = (): ThunkType => (dispatch) => {
    return null
}
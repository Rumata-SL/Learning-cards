import {ThunkType} from "../../bll/store";


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

export const registerTC = (): ThunkType => async dispatch => {
    try {

    } catch (e) {

    } finally {

    }
}


export type RegisteredActionType = ReturnType<typeof registrationAC>
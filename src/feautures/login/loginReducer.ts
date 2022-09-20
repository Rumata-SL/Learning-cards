
//initial state
import {Dispatch} from 'redux';
import {AppRootActionsType, AppStateType, ThunkType} from '../../bll/store';
import {authAPI} from '../../api/authAPI';
import {ThunkDispatch} from 'redux-thunk';

const initialState: InitialStateType = {
    isLoggedIn: false
}

//reducer
export const loginReducer = (state: InitialStateType = initialState, action: LoginActionType) => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//actions
const loginAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN', value
    } as const
}

//thunks
export const loginTC = (email: string, password: string, rememberMe: boolean=false): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, AppRootActionsType>) => {
    authAPI.login(email,password,rememberMe)
        .then(res=>{})
}

//types
type InitialStateType = {
    isLoggedIn: boolean
}

export type LoginActionType = ReturnType<typeof loginAC>
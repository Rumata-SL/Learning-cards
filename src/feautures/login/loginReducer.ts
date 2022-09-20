
//initial state
import {Dispatch} from 'redux';
import {AppRootActionsType, AppStateType, ThunkType} from '../../bll/store';
import {authAPI} from '../../api/authAPI';
import {ThunkDispatch} from 'redux-thunk';
import {AxiosError} from 'axios';

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
export const loginTC = (email: string, password: string, rememberMe: boolean=false): ThunkType => async dispatch => {
    try{
         const res = await authAPI.login(email,password,rememberMe)
    }catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
    }finally {

    }
}

//types
type InitialStateType = {
    isLoggedIn: boolean
}

export type LoginActionType = ReturnType<typeof loginAC>
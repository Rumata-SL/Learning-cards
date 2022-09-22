//initial state
import {ThunkType} from '../../bll/store'
import {authAPI} from '../../api/authAPI'
import {AxiosError} from 'axios'
import {setAppStatusAC} from '../../app/appReducer'
import {utilsError} from '../../utils/utils_error'

const initialState: InitialStateType = {
    isLoggedIn: false,
}

//reducer
export const loginReducer = (state: InitialStateType = initialState,action: LoginActionType) => {
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
        type: 'login/SET-IS-LOGGED-IN',
        value,
    } as const
}

//thunks
export const loginTC =
    (email: string, password: string, rememberMe: boolean = false): ThunkType =>
        async dispatch => {
            dispatch(setAppStatusAC('loading'))
            try {
                const res = await authAPI.login(email, password, rememberMe)
                dispatch(loginAC(true))
            } catch (e) {
                const err = e as Error | AxiosError<{ error: string }>
            } finally {
                dispatch(setAppStatusAC('idle'))
            }
        }

export const logoutTC = (): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.logout()
        dispatch(loginAC(false))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        utilsError(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

//types
type InitialStateType = {
	isLoggedIn: boolean
}

export type LoginActionType = ReturnType<typeof loginAC>
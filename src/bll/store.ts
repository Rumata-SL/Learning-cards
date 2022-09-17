import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "../feautures/profile/profileReducer";
import {loginReducer} from "../feautures/login/loginReducer";
import {newPasswordReducer} from "../feautures/newPassword/newPasswordReducer";
import {registrationReducer} from "../feautures/registration/registrationReducer";
import {recoveryReducer} from "../feautures/recovery/recoveryReducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    newPassword: newPasswordReducer,
    registration: registrationReducer,
    recovery:recoveryReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>


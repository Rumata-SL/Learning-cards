import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "./reducers/profileReducer";
import {loginReducer} from "./reducers/loginReducer";
import {newPasswordReducer} from "./reducers/newPasswordReducer";
import {registrationReducer} from "./reducers/registrationReducer";
import {recoveryReducer} from "./reducers/recoveryReducer";
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
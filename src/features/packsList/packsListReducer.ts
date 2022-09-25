import {ThunkType} from "../../bll/store";

//initial state
type InitialStateType = typeof initialState

const initialState = {}

//reducer
export const packsListReducer = (state: InitialStateType = initialState, action: PacksListActionType): InitialStateType => {
    switch (action.type) {
        case "packsList/your-action":
            return state
        default:
            return state
    }
}

//AC
const packsListAC = () => ({
    type: "packsList/your-action"
} as const)

//TC
export const packsListTC = (): ThunkType => async dispatch => {
    try {

    } catch (e) {

    } finally {

    }
}

//types
export type PacksListActionType = ReturnType<typeof packsListAC>
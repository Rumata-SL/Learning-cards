

const initialState = {

}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {

        default:
            return state
    }
}

type ActionType = ReturnType<typeof setInitializedAC>

const setInitializedAC = (value: boolean)=>{
    return{
        type:""
    }as const
}

type InitialStateType= {
    login:string
}

const initialState = ''

export type LoginActionType = ReturnType<typeof loginAC>

export const loginReducer = (state=true, action:LoginActionType)=>{
        switch (action.type){
            default:
                return state
        }
}

const loginAC = ()=>{
    return{
        type:"LOGIN"
    }as const
}
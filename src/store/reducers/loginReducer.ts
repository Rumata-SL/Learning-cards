
type InitialStateType= {
    login:string
}

type ActionType = ReturnType<typeof loginAC>

export const loginReducer = (state=true, action:ActionType)=>{
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
type InitialStateType= {
    login:string
}

type ActionType = ReturnType<typeof recoveryAC>

export const recoveryReducer = (state:InitialStateType, action:ActionType)=>{
    switch (action.type){
        default:
            return state
    }
}

const recoveryAC = ()=>{
    return{
        type:"RECOVERY"
    }as const
}
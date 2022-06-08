type InitialStateType= {
    login:string
}

type ActionType = ReturnType<typeof profileAC>

export const profileReducer = (state:InitialStateType, action:ActionType)=>{
    switch (action.type){
        default:
            return state
    }
}

const profileAC = ()=>{
    return{
        type:"PROFILE"
    }as const
}
type InitialStateType= {
    login:string
}

type ActionType = ReturnType<typeof registrationAC>

export const registrationReducer = (state:InitialStateType, action:ActionType)=>{
    switch (action.type){
        default:
            return state
    }
}

const registrationAC = ()=>{
    return{
        type:"REGISTRATION"
    }as const
}
type InitialStateType= {
    profile:Array<string>
}

type ActionType = ReturnType<typeof profileAC>


export const profileReducer = (state=true, action:ActionType)=>{
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
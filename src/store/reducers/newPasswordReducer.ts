type InitialStateType= {
    password:string
}

type ActionType = ReturnType<typeof newPasswordAC>

export const newPasswordReducer = (state=true, action:ActionType)=>{
    switch (action.type){
        default:
            return state
    }
}

const newPasswordAC = ()=>{
    return{
        type:"NEW-LOGIN"
    }as const
}
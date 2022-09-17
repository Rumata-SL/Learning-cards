type InitialStateType= {
    login:string
    password:string
}

type ActionType = ReturnType<typeof registrationAC>

const initialState = {
    login:"",
    password:'',
}

export const registrationReducer = (state=true, action:ActionType)=>{
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
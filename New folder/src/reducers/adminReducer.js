export const initialState1 = null
export const reducer=(state1,action1)=>{
    if(action1.type==="USER")
    {
        return action1.payload
    }
    if(action1.type==="CLEAR"){
        return null
    }
    return state1
}
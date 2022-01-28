import {createSlice} from "@reduxjs/toolkit" //it is used for create slice state

export const userSlice = createSlice({
    name:"user",// it is an identifier of an state
    initialState:{},
    reducers:{
        update_user:(state,action) =>{
            
            state.user = action.payload.userDetails // you can see that it is mutating but immer library handle it

        }
    }
})

export const {update_user} = userSlice.actions

export default userSlice.reducer//creating reducer of color slice
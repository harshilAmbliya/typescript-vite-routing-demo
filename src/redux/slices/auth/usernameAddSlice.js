import { AddUserName } from '@/redux/actions/auth/usernameAddAction';
import { createSlice } from '@reduxjs/toolkit'
const initialState = {}

export const AddUserNameSlice = createSlice({
    name: 'AddUserName',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(AddUserName.fulfilled, (state, action) => {
            
            // Update the state by returning the new state
            return action.payload;
        });
        builder.addDefaultCase((state) => {
            // Handle default case (optional)
            return state;
        });
    }
})


export default AddUserNameSlice.reducer
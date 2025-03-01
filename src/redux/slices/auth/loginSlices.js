import { createSlice } from '@reduxjs/toolkit'
import { login } from '../../actions/auth/loginAction';
const initialState = {}

export const loginSlices = createSlice({
    name: 'login',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            // Update the state by returning the new state
            return action.payload;
        });
        builder.addDefaultCase((state) => {
            // Handle default case (optional)
            return state;
        });
    }
})


export default loginSlices.reducer
import { createSlice } from '@reduxjs/toolkit'
import { logout } from '../../actions/auth/logoutAction';
const initialState = {}

export const logoutSlices = createSlice({
    name: 'logout',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, (state, action) => {
            // Update the state by returning the new state
            return action.payload;
        });
        builder.addDefaultCase((state) => {
            // Handle default case (optional)
            return state;
        });
    }
})


export default logoutSlices.reducer
import { createSlice } from '@reduxjs/toolkit'
import { AdminLogin } from '@/redux/actions/auth/AdminAction';
const initialState = {}

export const AdminLoginSlices = createSlice({
    name: 'AdminLogin',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(AdminLogin.fulfilled, (state, action) => {
            // Update the state by returning the new state
            return action.payload;
        });
        builder.addDefaultCase((state) => {
            // Handle default case (optional)
            return state;
        });
    }
})


export default AdminLoginSlices.reducer
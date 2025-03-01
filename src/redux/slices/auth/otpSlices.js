import { createSlice } from '@reduxjs/toolkit'
import {  verifyOtp } from '../../actions/auth/otpAction';
const initialState = {}

export const otpSlices = createSlice({
    name: 'otp',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(verifyOtp.fulfilled, (state, action) => {
            // Update the state by returning the new state
            return action?.payload || null;
        });
        builder.addDefaultCase((state) => {
            // Handle default case (optional)
            return state;
        });
    }
})


export default otpSlices.reducer
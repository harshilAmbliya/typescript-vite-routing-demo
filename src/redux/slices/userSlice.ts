
import { getAllUsers } from '@/redux/actions/userAction';
import { createSlice } from '@reduxjs/toolkit'
const initialState = {}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addDefaultCase((state) => {
            return state;
        });
    },
    reducers: {}
})


export default userSlice.reducer
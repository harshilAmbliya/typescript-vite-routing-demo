import { CreateOrder, getAllCafeOrders, selectOrder } from '@/redux/actions/admin/ordersAction';
import { createSlice } from '@reduxjs/toolkit'
const initialState = {}

export const AdminOrderSlice = createSlice({
    name: 'AdminOrders',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(CreateOrder.fulfilled, (state, action) => {
            const { data, success } = action.payload && action?.payload
            // Update the state by returning the new state
            return { data, success };
        });
        builder.addCase(getAllCafeOrders.fulfilled, (state, action) => {
            const { data, success } = action.payload && action?.payload
            // Update the state by returning the new state
            return { data, success };
        });
        builder.addCase(selectOrder.fulfilled, (state, action) => {
            const { data, success } = action.payload && action?.payload
            // Update the state by returning the new state
            return { data, success };
        });
      
        builder.addDefaultCase((state) => {
            // Handle default case (optional)
            return state;
        });
    }
})

export default AdminOrderSlice.reducer
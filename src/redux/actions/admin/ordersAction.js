import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiBaseUrl } from "@/constants";
import axiosInstance from "@/config/axiosInterceptor";
import { showToast } from "@/redux/slices/toast/toastSlice";
import { getAllOrder } from "../orders/orderAction";
import { unsetLoading } from "@/redux/slices/loadDataLoading/isLoadingSlice";

export const CreateOrder = createAsyncThunk('AdminOrders/CreateOrder', async (payload, { dispatch }) => {
    const { data, router, setOrderCreatingLoading } = payload;
    try {
        setOrderCreatingLoading && setOrderCreatingLoading(true)
        const response = await axiosInstance.post(apiBaseUrl.ORDER + "/add-orders", data);
        if (response.success) {

            // dispatch(showToast({ message: response?.message, type: "success" }))
            localStorage.setItem("orderId", response?.data?._id)
            // payload && payload?.setIsLoadData && payload?.setIsLoadData(false)
            dispatch(unsetLoading())
            setOrderCreatingLoading && setOrderCreatingLoading(false)
            // old committed
            // router.push("/manager")
            // new committed
            // router.push("/manager/manage-table?tableNo="+data.tableNo)
        }
        return response;
    } catch (error) {
        dispatch(unsetLoading())
        setOrderCreatingLoading && setOrderCreatingLoading(false)
        payload && payload?.setIsLoadData && payload?.setIsLoadData(false)
        dispatch(showToast({ message: error?.response?.data?.message, type: "error" }))
        throw error;
    }
});
export const getAllCafeOrders = createAsyncThunk('AdminOrders/getAllCafeOrders', async (payload, { dispatch }) => {

    try {
        const response = await axiosInstance.get(apiBaseUrl.ORDER + "/cafe-orders");
        if (response.success) {
            // dispatch(showToast({ message: response?.message, type: "success" }))
            dispatch(unsetLoading())
        }
        return response;
    } catch (error) {
        dispatch(unsetLoading())
        dispatch(showToast({ message: error?.response?.data?.message, type: "error" }))
        throw error;
    }
});
export const selectOrder = createAsyncThunk('AdminOrders/selectOrder', async (payload, { dispatch }) => {
    const { orderId } = payload;
    try {

        const response = await axiosInstance.get(apiBaseUrl.ORDER + "/select-orders?orderId=" + orderId);
        if (response.success) {
            // dispatch(showToast({ message: response?.message, type: "success" }))

            dispatch(getAllOrder())
            dispatch(unsetLoading())
        }
        return response;
    } catch (error) {
        dispatch(unsetLoading())
        dispatch(showToast({ message: error?.response?.data?.message, type: "error" }))
        throw error;
    }
});
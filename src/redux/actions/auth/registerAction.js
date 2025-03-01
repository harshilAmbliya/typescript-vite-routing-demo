import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiBaseUrl } from "@/constants";
import axiosInstance from "@/config/axiosInterceptor";
import { showToast } from "@/redux/slices/toast/toastSlice";
import { setLoading, unsetLoading } from "@/redux/slices/loadDataLoading/isLoadingSlice";

export const registerUser = createAsyncThunk('register/register', async (payload, { dispatch }) => {
    const { data, router } = payload;
    try {
        dispatch(setLoading())
        const response = await axiosInstance.post(apiBaseUrl.REGISTER, data);
        if (response?.success) {
            dispatch(unsetLoading())
            // router.push("/user-login")
            dispatch(showToast({ message: response?.message, type: "success" }))
        }
        return response

    } catch (error) {
        dispatch(unsetLoading())
        dispatch(showToast({ message: error?.response?.data?.message, type: "error" }))
        throw error;
    }
});

export const managerAdd = createAsyncThunk('managerAdd/managerAdd', async (payload, { dispatch }) => {
    const { data, router, setIsDisabled } = payload;
    try {
        dispatch(setLoading())
        const response = await axiosInstance.post(apiBaseUrl.Add_USERNAME, data);
        if (response?.success) {
            setIsDisabled(false)
            dispatch(unsetLoading())
            router.push("/manager-login")
        }

    } catch (error) {
        setIsDisabled(false)
        dispatch(unsetLoading())
        dispatch(showToast({ message: error?.response?.data?.message, type: "error" }))
        throw error;
    }
});
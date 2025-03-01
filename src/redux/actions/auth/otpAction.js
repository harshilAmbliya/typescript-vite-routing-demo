import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiBaseUrl } from "@/constants";
import axiosInstance from "@/config/axiosInterceptor";
import { showToast } from "@/redux/slices/toast/toastSlice";
import { unsetLoading } from "@/redux/slices/loadDataLoading/isLoadingSlice";

export const verifyOtp = createAsyncThunk('otp/verifyOtp', async (payload, { dispatch }) => {
    const { data ,router, setIsDisabled } = payload;
    try {
        const response = await axiosInstance.post(apiBaseUrl.OTP,data);
        if (response?.success) {
            setIsDisabled && setIsDisabled(false)
            dispatch(unsetLoading())
            localStorage.setItem('forgot-password-token', response?.data)
            dispatch(showToast({ message: response?.message, type: "success" }))
            router.push("/reset-password")
        }
        return response?.data
    } catch (error) {
        dispatch(unsetLoading())
        setIsDisabled && setIsDisabled(false)
        dispatch(showToast({ message: error?.response?.data?.message, type: "error" }))
     
    }
});
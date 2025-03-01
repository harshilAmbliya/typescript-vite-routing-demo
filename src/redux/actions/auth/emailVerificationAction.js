import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiBaseUrl } from "@/constants";
import axiosInstance from "@/config/axiosInterceptor";
import { showToast } from "@/redux/slices/toast/toastSlice";
import { setLoading, unsetLoading } from "@/redux/slices/loadDataLoading/isLoadingSlice";

export const VerifyEmail = createAsyncThunk('email_verification/VerifyEmail', async (payload, { dispatch }) => {
    const { data, router } = payload;
    // dispatch(setLoading())
    try {
        const response = await axiosInstance.get(apiBaseUrl.Verify_Email + '?email=' + data?.email);
        if (response?.success) {
            localStorage.setItem('verification-email', data?.email)
            dispatch(unsetLoading())
            router.replace("/otp-verification")
            return response;
        }

    } catch (error) {
        dispatch(unsetLoading())
        dispatch(showToast({ message: error?.response?.data?.message, type: "error" }))
        throw error;
    }
});
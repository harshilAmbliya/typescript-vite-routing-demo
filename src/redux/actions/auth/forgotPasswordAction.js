import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiBaseUrl } from "@/constants";
import axiosInstance from "@/config/axiosInterceptor";
import { showToast } from "@/redux/slices/toast/toastSlice";
import { unsetLoading, setLoading } from "@/redux/slices/loadDataLoading/isLoadingSlice";

export const forgotPassword = createAsyncThunk('password/forgotPassword', async (payload, { dispatch }) => {
    const { data, router, setIsDisabled } = payload
    // dispatch(setLoading())
    try {
        const response = await axiosInstance.post(apiBaseUrl.FORGOT_PASSWORD, data );
        
        if (response?.success) {
            localStorage.clear()
            setIsDisabled(true)
            dispatch(showToast({ message: response?.message, type: "success" }))
            dispatch(unsetLoading())
            router.push("/user-login")
        }
        return response
    } catch (error) {
        if(error.response.status === 422){
            dispatch(unsetLoading())
            setIsDisabled(false)
            dispatch(showToast({ message: error?.response?.data?.message, type: "error" }))
            localStorage.clear()
            router.push("/user-login")
        } else {
            dispatch(unsetLoading())
            setIsDisabled(false)
            dispatch(showToast({ message: error?.response?.data?.message, type: "error" }))
        }
       

    }
});
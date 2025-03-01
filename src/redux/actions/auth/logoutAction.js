import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiBaseUrl } from "@/constants";
import axiosInstance from "@/config/axiosInterceptor";
import { showToast } from "@/redux/slices/toast/toastSlice";
import { unsetLoading } from "@/redux/slices/loadDataLoading/isLoadingSlice";
import Cookies from "js-cookie";
import { socket } from "@/config/socketConfig";

export const logout = createAsyncThunk('logout/logout', async (payload, { dispatch }) => {
    const { router } = payload;
    try {
        // const response = await axiosInstance.get(apiBaseUrl.LOGOUT);
        // localStorage.removeItem("authorizeToken")
        // localStorage.removeItem("tableNo")
        // localStorage.removeItem("role");

        // if (response?.success) {
        // dispatch(unsetLoading())
        // router.push("/")
        
        const role = localStorage.getItem("role")
        setTimeout(() => {
            Cookies.remove('token');
            Cookies.remove('role');
            Cookies.remove('userStatus');
            Cookies.remove('currentStatus');
            socket.disconnect()
            localStorage.clear()
            dispatch(showToast({ message: "user logout successfully", type: "success" }))
        }, 0);

        role !== "ar" ? window.location.href = ("/manager-login") : window.location.href = ("/")
        return true
        // }
    } catch (error) {
        dispatch(unsetLoading())
        dispatch(showToast({ message: error?.response?.data?.message, type: "error" }))
        throw error;
    }
});
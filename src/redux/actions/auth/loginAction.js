import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiBaseUrl } from "@/constants";
import axiosInstance from "@/config/axiosInterceptor";
import { showToast } from "@/redux/slices/toast/toastSlice";
import { startLoading, stopLoading } from "@/redux/slices/loading/loadingSlice";
import { setLoading, unsetLoading } from "@/redux/slices/loadDataLoading/isLoadingSlice";
import { set } from "lodash";
import Cookies from "js-cookie";
import { socket } from "@/config/socketConfig";

export const login = createAsyncThunk('login/login', async (payload, { dispatch }) => {
    const { data, router, setIsDisabled } = payload;
    try {

        // setLoading(true)
        // dispatch(setLoading())
        const response = await axiosInstance.post(apiBaseUrl.LOGIN, data);
        if (response?.success) {
            setIsDisabled(false)
            localStorage.setItem('authorizeToken', response?.data?.token || null);
            localStorage.setItem('role', response?.data?.user?.role || null);
            localStorage.setItem('user', JSON.stringify(response?.data?.user) || null);
            localStorage.setItem('loginDate', new Date().toLocaleDateString("en-GB"));
            Cookies.set('token', response?.data?.token);
            Cookies.set('loginDate', new Date().toLocaleDateString("en-GB"));
            Cookies.set('role', response?.data?.user?.role);
            Cookies.set('userStatus', response?.data?.user?.status);
            Cookies.set('currentStatus', response?.data?.user?.currentStatus);
            localStorage.setItem("checkingTime", new Date().getTime());
            // dispatch(unsetLoading())

            // dispatch(showToast({ message: response?.message, type: "success" }))
            // router.push("/otp-verification")
            return response
        }
        dispatch(unsetLoading())
        // setLoading(false)
        return response
    } catch (error) {
        setIsDisabled(false)
        dispatch(unsetLoading())
        dispatch(showToast({ message: error?.response?.data?.message, type: "error" }))
        dispatch(stopLoading({ loading: false }))
        throw error;
    }
});
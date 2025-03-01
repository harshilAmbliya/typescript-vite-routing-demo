import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiBaseUrl } from "@/constants";
import axiosInstance from "@/config/axiosInterceptor";
import { showToast } from "@/redux/slices/toast/toastSlice";
import { startLoading, stopLoading } from "@/redux/slices/loading/loadingSlice";
import { unsetLoading } from "@/redux/slices/loadDataLoading/isLoadingSlice";
import Cookies from "js-cookie";

export const AdminLogin = createAsyncThunk('AdminLogin/AdminLogin', async (payload, { dispatch }) => {
    const { data, router, setIsDisabled } = payload;
    const tableNo = localStorage.getItem("tableNo")
    try {
        dispatch(startLoading({ loading: true }))
        localStorage.clear()
        localStorage.removeItem("persist:root");

        const response = await axiosInstance.post(apiBaseUrl.ADMIN_LOGIN, data);
        if (response?.success) {
            dispatch(showToast({ message: response?.message, type: "success" }))
            localStorage.setItem('tableNo', tableNo);
            localStorage.setItem('authorizeToken', response?.data?.token || null);
            localStorage.setItem('role', response?.data?.user?.role || null);
            localStorage.setItem('user', JSON.stringify(response?.data?.user) || null);
            Cookies.set('token', response?.data?.token);
            Cookies.set('role', response?.data?.user?.role);
            Cookies.set('tableNo', tableNo);
            Cookies.set('userStatus', response?.data?.user?.status);
            Cookies.set('currentStatus', response?.data?.user?.currentStatus);
            if (response?.data?.user?.role === 'manager') {
                if (response?.data?.user?.role === 'manager') {
                    window.location.href = '/manager/tables'
                } else {
                    localStorage.clear();
                    localStorage.removeItem("persist:root");
                    setIsDisabled(false)
                    dispatch(showToast({ message: 'manager does not have permission to login', type: "error" }))
                    dispatch(unsetLoading())
                    // router.push('/manager-login');
                    window.location.href = '/manager-login'
                    // router.push("/manager/tables")
                    // router.refresh()

                }
            } else if (response?.data?.user?.role === 'admin') {
                if (response?.data?.user?.role === 'admin') {
                    // router.push('/manager/tables');
                    window.location.href = '/manager/tables'
                    // router.push("/manager/tables")
                    // router.refresh()

                } else {
                    localStorage.clear();
                    localStorage.removeItem("persist:root");
                    setIsDisabled(false)
                    dispatch(showToast({ message: 'admin does not have permission to login', type: "error" }))
                    dispatch(unsetLoading())
                    // router.push('/manager-login');
                    window.location.href = '/manager-login'
                }
            }
            else if (response?.data?.user?.role === 'ar') {
                if (response?.data?.user?.role === 'ar') {
                    // router.push('/manager/tables');
                    localStorage.setItem("tableNo",13);
                    Cookies.set('tableNo', 13);
                    window.location.href = '/'
                    // router.push("/manager/tables")
                    // router.refresh()

                } else {
                    localStorage.clear();
                    localStorage.removeItem("persist:root");
                    setIsDisabled(false)
                    dispatch(showToast({ message: 'user does not have permission to login', type: "error" }))
                    dispatch(unsetLoading())
                    // router.push('/manager-login');
                    window.location.href = '/user-login'
                }
            }
            else {
                router.push("/")
            }
        }
        dispatch(stopLoading({ loading: false }))
        return response
    } catch (error) {
        dispatch(unsetLoading())
        setIsDisabled(false)
        dispatch(showToast({ message: error?.response?.data?.message, type: "error" }))
        throw error;
    }
});
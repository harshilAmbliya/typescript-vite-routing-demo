import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiBaseUrl } from "@/constants";
import axiosInstance from "@/config/axiosInterceptor";
import { showToast } from "@/redux/slices/toast/toastSlice";
import { unsetLoading } from "@/redux/slices/loadDataLoading/isLoadingSlice";

export const AddUserName = createAsyncThunk('AddUserName/AddUserName', async (payload, { dispatch }) => {
    const { name, setIsDisabled } = payload
    try {

        const response = await axiosInstance.post(apiBaseUrl.Add_USERNAME + "/add-name", { name });

        if (response) {
            // dispatch(showToast({ message: response?.message, type: "success" }))
            dispatch(unsetLoading())
        }
        return response
    } catch (error) {
        dispatch(unsetLoading())
        setIsDisabled(false)
        dispatch(showToast({ message: error?.response?.data?.message, type: "error" }))

    }
});
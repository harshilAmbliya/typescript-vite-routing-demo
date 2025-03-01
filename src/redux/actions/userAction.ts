import { createAsyncThunk } from "@reduxjs/toolkit";
// import { apiBaseUrl } from "@/constants/index";
import axiosInstance from "@/config/axiosInterceptor";
import { AxiosResponse } from "axios";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_: any, {}) => {
    try {
      let url = "https://jsonplaceholder.typicode.com/users";
      const response: AxiosResponse | any = await axiosInstance.get(url);

      if (response) {
        return response;
      }
    } catch (error: any) {
      throw error;
    }
  }
);

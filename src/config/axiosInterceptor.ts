// xiosConfig.js

import axios from 'axios';
import { environment } from './environment';

const axiosInstance = axios.create({
  baseURL: environment.SERVER_URL + '/api/',
  //   timeout: 5000, // Adjust the timeout as needed
});


// comment added
const getTokenFromLocalStorage = () => {
  try {
    // Replace 'your_token_key' with the actual key you use to store the token in local storage
    const token = localStorage.getItem('authorizeToken');

    if (token) {
      return token;
    } else {
      // console.error('Token not found in local storage.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving token from local storage:', error);
    return null;
  }
};

// Request interceptor to add authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    // Add your token validation logic here
    const token = getTokenFromLocalStorage(); // Implement your token retrieval logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['ngrok-skip-browser-warning'] = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle API errors or unauthorized requests
    if (error.response) {
      if (error.response.status === 401) {

        // Redirect to login or handle unauthorized access
        localStorage.clear();
        // window.location.href = "/login"
        window.location.href = "/user-login"
        // toast.error(`Unauthorized - Please log in.`);
        return Promise.reject(error);
        // console.error('Unauthorized access. Redirecting to login.');
      } else {
        console.error('API error:', error.response.data);
        return Promise.reject({ ...error });
      }
    } else {
      console.error('Network error:', error.message);

    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

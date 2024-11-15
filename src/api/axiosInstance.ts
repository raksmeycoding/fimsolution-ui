import axios from 'axios';
import d from "../constant/constant"
import {RespondDto} from "../types";
import {ResponseUserInfo} from "../types/auth";
import {getAccessToken, setAccessToken} from "../utils/tokenSerivce";


const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_ENDPOINT,
        withCredentials: true, // Required to send cookies for refresh token
    })
;


axiosInstance.interceptors.request.use((config) => {

    const token = getAccessToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});


// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const resWithNewToken = await axiosInstance.post<RespondDto<ResponseUserInfo>>(d.auth.API_AUTH_REFRESH_URL);

                if (resWithNewToken.data) {

                    setAccessToken(resWithNewToken.data.data.token as string)

                    localStorage.setItem(d.lStorageKey.STATUS_LOGIN_KEY, d.lStorageValue.STATUS_LOGIN_VALUE_1)

                    originalRequest.headers['Authorization'] = `Bearer ${getAccessToken()}`;
                    return axiosInstance(originalRequest);
                }

            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

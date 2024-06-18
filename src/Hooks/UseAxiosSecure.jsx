import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://survey-shark-server.vercel.app'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(config => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }, error => {
            return Promise.reject(error);
        });

        const responseInterceptor = axiosSecure.interceptors.response.use(response => {
            return response;
        }, async error => {
            const status = error.response?.status;
            if ( status === 403) {
                navigate('/');
            }
            return Promise.reject(error);
        });

        // Cleanup interceptors on unmount
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;

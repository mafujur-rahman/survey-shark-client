import axios from "axios";

const AxiosSecure = axios.create({
    baseURL:'http://localhost:5000'
})

const UseAxiosSecure = () => {
    return AxiosSecure;
};

export default UseAxiosSecure;
import axios from "axios";


const AxiosPublic = axios.create({
    baseURL: 'https://survey-shark-server.vercel.app'
})

const UseAxiosPublic = () => {
    return AxiosPublic;
};

export default UseAxiosPublic;
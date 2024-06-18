import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import UseAxiosSecure from "./UseAxiosSecure";


const useAdmin = () => {
    const {user} = useContext(AuthContext);
    const AxiosSecure = UseAxiosSecure();
    const {data: isAdmin} = useQuery({
        queryKey:[user?.email, 'isAdmin'],
        queryFn:async ()=>{
            const res = await AxiosSecure.get(`/users/admin/${user?.email}`)
            return res.data.admin;
        }
    })
    return [isAdmin]
};

export default useAdmin;
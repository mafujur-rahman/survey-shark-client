import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useProUser = () => {
    const {user} = useContext(AuthContext);
    const AxiosSecure = UseAxiosSecure();
    const {data: isProUser} = useQuery({
        queryKey:[user?.email, 'isProUser'],
        queryFn:async ()=>{
            const res = await AxiosSecure.get(`/users/pro-user/${user?.email}`)
            return res.data.proUser;
        }
    })
    return [isProUser]
};
export default useProUser;
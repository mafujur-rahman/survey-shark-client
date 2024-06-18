import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useSurveyor = () => {
    const { user } = useContext(AuthContext);
    const AxiosSecure = UseAxiosSecure();
    const { data: isSurveyor } = useQuery({
        queryKey: [user?.email, 'isSurveyor'],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/users/surveyor/${user?.email}`)
            return res.data.surveyor;
        }
    })
    return [isSurveyor]
};

export default useSurveyor;
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from "../Context/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();


    if (user) {
        return children
    }
    return <Navigate state={location.pathname} to="/log-in"></Navigate>;
};
PrivateRoute.propTypes ={
    children: PropTypes.node
}
export default PrivateRoute;
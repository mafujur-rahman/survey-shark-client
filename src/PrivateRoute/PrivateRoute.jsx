import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from "../Context/AuthProvider";
import Skeleton from "react-loading-skeleton";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div>
                <Skeleton height={100} width={100} /> 
                <Skeleton count={3} /> 
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate state={{ from: location }} to="/log-in" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;

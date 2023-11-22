import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const RequireAdminAuth = (props) => {

    const { isAuth } = useAuth();
    const { userRole } = useSelector((state) => state.user.user.user); 
    
    if(!isAuth) {
        return <Navigate to="/auth/login" replace={true} />
    }

    if(isAuth && !userRole) {
        return <Navigate to="/home" replace={true} />
    }

    return props.children;
};

export default RequireAdminAuth;
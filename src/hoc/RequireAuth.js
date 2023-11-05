import React from 'react'
import { Navigate } from 'react-router-dom';

const RequireAuth = (props) => {
  
    const isAuth = true;

    if(!isAuth) {
        return <Navigate to="/auth/login" replace={true}/>     
    }
  
    return props.children;
}

export default RequireAuth;
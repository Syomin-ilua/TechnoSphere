import React from 'react'
import { Navigate } from 'react-router-dom';

const RequireAuth = (props) => {
  
    const isAuth = false;

    if(!isAuth) {
        return <Navigate to="/login" replace={true}/>     
    }
  
    return props.children;
}

export default RequireAuth;
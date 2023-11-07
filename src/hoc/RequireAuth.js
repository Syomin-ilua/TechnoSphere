import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const RequireAuth = (props) => {
  
    const { isAuth } = useAuth(); 
    console.log(isAuth); 

    if(!isAuth) {
        return <Navigate to="/auth/login" replace={true}/>     
    }
  
    return props.children;
}

export default RequireAuth;
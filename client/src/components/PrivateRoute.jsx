import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const PrivateRoute = ({children}) => {
    const {isAuthenticated,authLoading}=useAuth();

    if(authLoading) return <div>Loading...</div>;
  return isAuthenticated?children:<Navigate to='/login'/>;
}

export default PrivateRoute

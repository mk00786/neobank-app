import React from 'react'
import { Navigate, replace, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const PrivateRoute = ({children}) => {
    const {isAuthenticated,authLoading}=useAuth();
    const location=useLocation();

    if(authLoading) return(
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500'></div>
      </div>
    ) 
  return isAuthenticated?children:<Navigate to='/login' state={{from:location}} replace/>;
}

export default PrivateRoute

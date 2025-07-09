import React, {  createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/api.js'

const AuthContext=createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [authLoading,setAuthLoading]=useState(true);
    const navigate=useNavigate();

    useEffect(()=>{
      const token=localStorage.getItem('token');
      if(token){
        axios.get('/auth/me')
        .then((res)=>setUser(res.data.user))
        .catch(()=>localStorage.removeItem('token'))
        .finally(()=>setAuthLoading(false));
      }else{
        setAuthLoading(false);
      }
    },[]);

    const register=async (formData)=>{
      try{
        const res=await axios.post('/auth/register',formData);
        localStorage.setItem('token',res.data.token);
        setUser(res.data.user);
        navigate('/dashboard');
      }catch(err){
        console.error('Registration Failed:',err.response?.data||err.message);
      }
    }

    const login=async (formData)=>{
      const res=await axios.post('/auth/login',formData);
      localStorage.setItem('token',res.data.token);
      setUser(res.data.user);
      navigate('/dashboard');
    }

    const logout=()=>{
      setUser(null);
      localStorage.removeItem('token');
      navigate('/login');
    };

  return (
    <AuthContext.Provider value={{user,login,logout,register,isAuthenticated:!!user,authLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth=()=>useContext(AuthContext);
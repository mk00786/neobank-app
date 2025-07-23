import React, {  createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/api.js'

const AuthContext=createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [authLoading,setAuthLoading]=useState(true);
    const navigate=useNavigate();
    const token=localStorage.getItem('token');

    useEffect(()=>{
      const fetchUser=async ()=>{
        const token=localStorage.getItem('token');
        if(!token){
          setAuthLoading(false);
          return;
        }

        try{
          const res=await axios.get('/auth/me');
          setUser(res.data.user);
        }catch(err){
          console.log('Fetch User Failed:',err.response?.data||err.message);
          localStorage.removeItem('token')
        }finally{
          setAuthLoading(false);
        }
      }

      fetchUser();
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
      try{
      const res=await axios.post('/auth/login',formData);
      localStorage.setItem('token',res.data.token);
      setUser(res.data.user);
      navigate('/dashboard');
      }catch(err){
        console.error('Login Failed',err.response?.data||err.message);
      }
    }

    const logout=useCallback(()=>{
      setUser(null);
      localStorage.removeItem('token');
      navigate('/login');
    },[navigate]);

    if(authLoading){
      return (
        <div className='flex justify-center items-center h-[70vh]'>
          <div className='animate-spin w-8 h-8 text-blue-600'></div>
        </div>
      )
    }

  return (
    <AuthContext.Provider value={{user,setUser,token,login,logout,register,isAuthenticated:!!user,authLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth=()=>useContext(AuthContext);
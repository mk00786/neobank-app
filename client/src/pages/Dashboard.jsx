import React, { useEffect, useState } from 'react'
import axios from '../utils/api.js'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'

const Dashboard = () => {
  const navigate=useNavigate();
  let {logout}=useAuth();
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  const [loggingOut,setLoggingOut]=useState(false);

  useEffect(()=>{
    const fetchUser=async ()=>{
      try{
        const res=await axios.get('/auth/me');
        setUser(res.data.user);
      }catch(err){
        console.error('Error fetching user:',err);
        toast.error('Session expired.Please login again.');
        logout();
        navigate('/login');
      }finally{
        setLoading(false);
      }
    }

    fetchUser();
  },[]);

  const handleLogout=async ()=>{
    setLoggingOut(true);
    try{
    await logout();//assumed to handle token removal
    toast.success('Logged Out Successfully');
    navigate('/login');
    }catch{
      toast.error('Logout failed!');
    }finally{
      setLoggingOut(false);
    }
  }

  if(loading) return (
    <div className='flex justify-center items-center h-[80vh]'>
      <ClipLoader size={40} color='#2563EB'/>
    </div>
  );

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold'>Welcome {user.email}</h1>
      <button onClick={handleLogout} disabled={loggingOut}
      className={`mt-4  text-white px-4 py-2 rounded ${loggingOut?'bg-gray-400':'bg-red-500 hover:bg-red-600'}`}
      >{loggingOut?'Logging Out':'Logout'}</button>
    </div>
  )
}

export default Dashboard

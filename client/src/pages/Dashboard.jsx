import React, { useEffect, useState } from 'react'
import axios from '../utils/api.js'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate=useNavigate();
  let {logout}=useAuth();
  const [user,setUser]=useState(null);

  useEffect(()=>{
    const fetchUser=async ()=>{
      try{
        const res=await axios.get('/auth/me');
        setUser(res.data.user);
      }catch(err){
        console.error('Error fetching user:',err);
        logout();
        navigate('/login');
      }
    }
    fetchUser();
  },[]);

  const handleLogout=()=>{
    logout();
    localStorage.removeItem('token');
    navigate('/login');
  }

  if(!user) return<div>Loading...</div>;

  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold'>Welcome {user.email}</h1>
      <button onClick={handleLogout}
      className='mt-4 bg-red-500 text-white px-4 py-2 rounded'
      >Logout</button>
    </div>
  )
}

export default Dashboard

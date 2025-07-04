import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate=useNavigate();
  let {user,logout}=useAuth();

  const handleLogout=()=>{
    logout();
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard

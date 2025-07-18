import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate=useNavigate();
    const {login}=useAuth();
    const [user,setUser]=useState({
      email:'',
      password:''
    });

    const handleChange=(e)=>{
      const {name,value}=e.target;

      setUser((preVal)=>(
        {...preVal,
          [name]:value,
        }
      ))
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();

        try{
          const res=await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              email:user.email,
              password:user.password}),
          });

          const data=await res.json();
          console.log(data);
          if(!res.ok) throw new Error(data.msg||'Login Failed');
          login(data.user);
          localStorage.setItem('token',data.token);
          navigate('/dashboard');
        }catch(err){
          alert(err.message||'Error logging in');
        }

        setUser({
          email:'',
          password:''
        })
    };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md w-full max-w-sm'>

        <h1 className='text-xl font-semibold mb-4'>Welcome {user.email||'Back'}</h1>

        <input type='email' placeholder='Enter email' name='email' value={user.email} 
        className='w-full border border-gray-300 rounded-md p-2 mb-4'
        onChange={handleChange} required/>

        <input type='password' placeholder='Enter Password' name='password' onChange={handleChange}
          required className='w-full border border-gray-300 rounded-md p-2 mb-4' value={user.password}
        />

        <button type='submit'
        className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 '
        >Login</button>

      </form>
    </div>
  )
}

export default Login
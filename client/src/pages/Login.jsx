import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../utils/api.js'
import toast from 'react-hot-toast'

const Login = () => {
    const navigate=useNavigate();
    const {login}=useAuth();
    const location=useLocation();

    const [user,setUser]=useState({
      email:'',
      password:''
    });
    const [showPassword,setShowPassword]=useState(false);
    const [rememberMe,setRememberMe]=useState(false);
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    

    const handleChange=(e)=>{
      const {name,value,type,checked}=e.target;

      if(name==='rememberMe'){
        setRememberMe(checked);
      }else{
        setUser((preVal)=>(
        {...preVal,
          [name]:value,
        }
      ))
      }
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
          const res=await axios.post('/auth/login',{
              email:user.email,
              password:user.password
            });

          const data=res.data;
          login(data.user);

          if(rememberMe){
            localStorage.setItem('token',data.token);
          }else{
            sessionStorage.setItem('token',data.token);
          }

          toast.success('Login Successfull');
          const redirectTo=location.state?.from?.pathname||'/dashboard';
          navigate(redirectTo);

        }catch(err){
          let msg=err.response?.data?.msg||'Error logging in';
          setError(msg);
          toast.error(msg.charAt(0).toUpperCase()+msg.slice(1));

        }finally{
          setLoading(false);
          setUser({
          email:'',
          password:''
        })
        }
    };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md w-full max-w-sm'>

        <h1 className='text-xl font-semibold mb-4'>Welcome {user.email||'Back'}</h1>

        {error&&<div className='bg-red-100 text-red-700 p-2 mb-4 rounded text-sm'>{error}</div>}

        <div className='mb-4'>
        <input type='email' placeholder='Enter email' name='email' value={user.email} 
        className='w-full border border-gray-300 rounded-md p-2'
        onChange={handleChange} disabled={loading} autoFocus required/>
        </div>

        <div className='relative mb-4'>
        <input type={showPassword?'text':'password'} placeholder='Enter Password' name='password' onChange={handleChange}
          required className='w-full border border-gray-300 rounded-md p-2 pr-10' value={user.password}
        disabled={loading}/>

        <span onClick={()=>setShowPassword((prev)=>!prev)}
        className='absolute right-3 top-2.5 cursor-pointer text-sm text-blue-500 select-none'
        >{showPassword?'Hide':'Show'}</span>
        </div>

        <div className='mb-4'>
        <label htmlFor='rememberMe'>
          <input type='checkbox' name='rememberMe' checked={rememberMe} onChange={handleChange} 
          className='inline-flex items-center text-sm' disabled={loading}/>
        Remember Me</label>
        </div>

        <button type='submit' disabled={loading}
        className={`w-full text-white py-2 rounded-md ${loading?'bg-gray-400 cursor-not-allowed':
        'bg-blue-500 hover:bg-blue-600'
        } `}
        >{loading?'Logging in...':'Login'}</button>

      </form>
    </div>
  )
}

export default Login
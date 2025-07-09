import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Register = () => {
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:''
    });
    const [error,setError]=useState(null);

    const {register}=useAuth();

    const handleChange=(e)=>{
        const {name,value}=e.target;

        setFormData((preVal)=>(
            {...preVal,[name]:value}
        ))
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();

         if(!formData.name||!formData.email||!formData.password){
        setError('All fields are required');
        return;
        }

        try{
            await register(formData);

            setFormData({
            name:'',
            email:'',
            password:''
        })

        }catch(err){
            setError(err.response?.data?.msg||'Registration Failed');
        }
    };

    useEffect(()=>{
        document.querySelector('input[name="name"]')?.focus();
    },[]);

  return (
    <div className='max-w-md rounded-xl mx-auto mt-10 p-6 bg-white shadow '>
        <h2 className='text-2xl font-bold mb-4 '>Register</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <input name='name' type='text' placeholder='Enter name' value={formData.name} 
            onChange={handleChange} className='w-full p-2 border rounded'/>
            <input name='email' type='email' placeholder='Enter email' value={formData.email}
                onChange={handleChange} className='w-full p-2 border rounded'/>
            <input name='password' type='password' placeholder='Enter password' value={formData.password}
                onChange={handleChange} className='w-full p-2 border rounded'/>
            <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer'>Register</button>
        </form> 
        {error&&<div className='text-red-500'>{error}</div>} 
    </div>
  )
}

export default Register

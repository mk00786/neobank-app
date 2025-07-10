import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Register = () => {
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:''
    });

    const [error,setError]=useState(null);
    const [success,setSuccess]=useState(null);
    const [loading,setLoading]=useState(false);
    const [formErrors,setFormErrors]=useState({});

    const {register}=useAuth();

    const handleChange=(e)=>{
        const {name,value}=e.target;

        setFormData((preVal)=>(
            {...preVal,[name]:value}
        ))

        setFormErrors((preVal)=>({...preVal,[name]:''}));
        setError(null);//This clears the top-level error like "Registration Failed"
    }

    const validateForm=()=>{
        let errors={};
        if(!formData.name.trim()) errors.name='Name is required';
        if(!formData.email.trim()) errors.email='Email is required';
        else if(!/\S+@\S+\.\S+/.test(formData.email)) errors.email='Email is invalid';
        if(!formData.password.trim()) errors.password='Password is required';
        else if(formData.password.length<6) errors.password='Password must be atleast 6 characters';
        
        return errors;
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();

        const errors=validateForm();
        if(Object.keys(errors).length>0){
            setFormErrors(errors);
            return;
        }

        //  if(!formData.name||!formData.email||!formData.password){
        // setError('All fields are required');
        // return;
        // }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try{
            await register(formData);
            setSuccess('Registration successfull! Redirecting ...');
            setFormData({
            name:'',
            email:'',
            password:''
        })
        setFormErrors({});

        setTimeout(()=>setSuccess(null),3000);

        }catch(err){
            setError(err.response?.data?.msg||'Registration Failed');
            setSuccess(null);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        document.querySelector('input[name="name"]')?.focus();
    },[]);

  return (
    <div className='max-w-md rounded-xl mx-auto mt-10 p-6 bg-white shadow '>
        <h2 className='text-2xl font-bold mb-4 '>Register</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>

            <label htmlFor='name' className='block font-medium'>Name</label>
            <input id='name' name='name' type='text' placeholder='Enter name' value={formData.name} 
            onChange={handleChange} className='w-full p-2 border rounded' disabled={loading}/>
            {formErrors.name&&<div className='text-sm text-red-500'>{formErrors.name}</div>}
            
            <label htmlFor='email' className='block font-medium'>Email</label>
            <input id='email' name='email' type='email' placeholder='Enter email' value={formData.email}
                onChange={handleChange} className='w-full p-2 border rounded' disabled={loading}/>
            {formErrors.email&&<div className='text-sm text-red-500'>{formErrors.email}</div>}

            <label htmlFor='password'>Password</label>
            <input id='password' name='password' type='password' placeholder='Enter password' value={formData.password}
                onChange={handleChange} className='w-full p-2 border rounded' disabled={loading}/>
            {formErrors.password&&<div className='text-sm text-red-500'>{formErrors.password}</div>}
            
            <button disabled={loading} type='submit' className='bg-blue-600 text-white px-4 py-2 rounded 
            cursor-pointer'>{loading?'Registering':'Register'}</button>
        </form> 
        {error&&<div className='text-red-500 mt-3'>{error}</div>} 
        {success&&<div className='text-green-500 mt-3'>{success}</div>}
    </div>
  )
}

export default Register

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.password.trim()) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      setFormData({ name: '', email: '', password: '' });
      setFormErrors({});
      toast.success('Registration successful! Redirecting...');
    } catch (err) {
      const msg = err.response?.data?.msg || 'Registration Failed';
      toast.error(msg.charAt(0).toUpperCase()+msg.slice(1));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.querySelector('input[name="name"]')?.focus();
  }, []);

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100 px-4'>
    <div className='max-w-md w-full bg-white rounded-lg shadow-md p-6'>
      <h2 className='text-2xl font-semibold text-center mb-6'>Create an Account</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
        {/* Name */}
          <label htmlFor='name' className='block text-sm text-gray-700 mb-1 font-medium'>Name</label>
          <input
            id='name'
            name='name'
            type='text'
            placeholder='Enter name'
            value={formData.name}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2
            focus:ring-blue-400'
            disabled={loading}
            required
          />
          {formErrors.name && <div className='text-sm text-red-500 mt-1'>{formErrors.name}</div>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor='email' className='block text-sm text-gray-700 mb-1 font-medium'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email'
            value={formData.email}
            onChange={handleChange}
            className='w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2
            focus:ring-blue-400'
            disabled={loading}
            required
          />
          {formErrors.email && <div className='text-sm text-red-500 mt-1'>{formErrors.email}</div>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Create a password'
            value={formData.password}
            onChange={handleChange}
            className='w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2
            focus:ring-blue-400'
            disabled={loading}
            required
          />
          {formErrors.password && <div className='text-sm text-red-500'>{formErrors.password}</div>}
        </div>

        <button
          disabled={loading}
          type='submit'
          className={`w-full py-2 rounded-md text-white transition-colors 
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Register;

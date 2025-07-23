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
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.querySelector('input[name="name"]')?.focus();
  }, []);

  return (
    <div className='max-w-md rounded-xl mx-auto mt-10 p-6 bg-white shadow'>
      <h2 className='text-2xl font-bold mb-4'>Register</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='name' className='block font-medium'>Name</label>
          <input
            id='name'
            name='name'
            type='text'
            placeholder='Enter name'
            value={formData.name}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            disabled={loading}
          />
          {formErrors.name && <div className='text-sm text-red-500'>{formErrors.name}</div>}
        </div>

        <div>
          <label htmlFor='email' className='block font-medium'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Enter email'
            value={formData.email}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            disabled={loading}
          />
          {formErrors.email && <div className='text-sm text-red-500'>{formErrors.email}</div>}
        </div>

        <div>
          <label htmlFor='password' className='block font-medium'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Enter password'
            value={formData.password}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            disabled={loading}
          />
          {formErrors.password && <div className='text-sm text-red-500'>{formErrors.password}</div>}
        </div>

        <button
          disabled={loading}
          type='submit'
          className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;

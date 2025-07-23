import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex justify-center items-center bg-gray-100 h-screen flex-col'>
      <h1 className='font-bold text-3xl mb-4'>Welcome to Our App!</h1>
      <div className='space-x-4'>
        <Link to='/login' className='text-blue-600 underline'>Login</Link>
        <Link to='/register' className='text-green-600 underline'>Register</Link>
      </div>
    </div>
  )
}

export default Home

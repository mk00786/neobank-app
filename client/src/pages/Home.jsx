import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <main className='flex justify-center items-center bg-gray-100 h-screen px-4'>
      <div className='text-center'>
      <h1 className='font-bold text-4xl md:text-5xl text-gray-800 mb-6'>Welcome to NeoBank App!</h1>
      <p className='mb-8 text-gray-600 text-lg'>Manage your finances effortlessly and securely</p>
      <div className='flex justify-center space-x-6'>
        <Link to='/login' className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
        shadow transition' aria-label='Login to your account'>Login</Link>

        <Link to='/register' aria-label='Register a new account' className='px-6 py-2 bg-green-600
        hover:bg-green-700 text-white rounded-lg shadow transition'>Register</Link>

      </div>
      </div>
    </main>
  )
}

export default Home

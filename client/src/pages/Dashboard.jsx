import React, { useEffect, useState } from 'react'
import axios from '../utils/api.js'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)

  // Fetch user details on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/auth/me')
        setUser(res.data.user)
      } catch (err) {
        console.error('Error fetching user:', err)
        toast.error('Session expired. Please login again.')
        await logout();
        navigate('/login', { state: { from: location.pathname } })
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [logout, navigate, location.pathname])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
      toast.success('You have been logged out.')
      navigate('/login')
    } catch (err) {
      console.error('Logout error:', err)
      toast.error('Logout failed. Try again.')
    } finally {
      setLoggingOut(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <ClipLoader size={40} color="#2563EB" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-sm mt-12">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>

      <div className="mb-6">
        <p className="text-lg text-gray-700">
          Welcome,{' '}
          <span className="font-semibold text-blue-600">{user?.email}</span>
        </p>
      </div>

      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className={`px-5 py-2 rounded font-medium text-white transition duration-200 ${
          loggingOut
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {loggingOut ? 'Logging Out...' : 'Logout'}
      </button>
    </div>
  )
}

export default Dashboard

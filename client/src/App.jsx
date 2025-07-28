import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import {Toaster} from 'react-hot-toast';
import Summary from './components/Summary';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

           {/* Protected Routes inside Dashboard Layout */}
          <Route element={<DashboardLayout/>}>
          <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path='/dashboard/projects' element={<PrivateRoute><h1>Projects</h1></PrivateRoute>}/>
          <Route path='/dashboard/settings' element={<PrivateRoute><h1>Settings</h1></PrivateRoute>}/>
          <Route path='/summary' element={<PrivateRoute><Summary/></PrivateRoute>}/>
          </Route>
        </Routes>

        {/* Global Toaster Notifications */}
        <Toaster position='top-right' reverseOrder={false}/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

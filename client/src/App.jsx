import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './components/layout/DashboardLayout';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route element={<DashboardLayout/>}>
          <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path='/dashboard/projects' element={<h1>Projects</h1>}/>
          <Route path='/dashboard/settings' element={<h1>Settings</h1>}/>
          </Route>
          {/* <Route element={<ProtectedRoute/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Route> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

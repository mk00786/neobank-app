import React from 'react'
import { NavLink,useLocation } from 'react-router-dom'

const navItems=[
    {label:'Dashboard',path:'/dashboard'},
    {label:'Projects',path:'/dashboard/projects'},
    {label:'Settings',path:'/dashboard/settings'}
];

const Sidebar = () => {
    const location=useLocation();
  return (
    <aside className='w-64 min-h-screen p-4 text-white bg-gray-900'>
    <h2 className='text-xl font-semibold mb-6'>Neobank</h2>
    <nav className='flex flex-col gap-4'>
        {navItems.map(({label,path})=>(
            <NavLink key={path} to={path}
            className={({isActive})=>`block px-4 py-2 rounded ${isActive?'bg-blue-600':'hover:bg-gray-700'}`}
            >{label}</NavLink>
        ))}
    </nav>
    </aside>
  )
}

export default Sidebar

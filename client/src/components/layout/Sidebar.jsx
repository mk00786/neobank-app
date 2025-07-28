import React from 'react'
import { NavLink } from 'react-router-dom'
import {LayoutDashboard,Folder,Settings} from 'lucide-react'

const navItems=[
    {label:'Dashboard',path:'/dashboard',icon:<LayoutDashboard size={18}/>},
    {label:'Projects',path:'/dashboard/projects',icon:<Folder size={18}/>},
    {label:'Settings',path:'/dashboard/settings',icon:<Settings size={18}/>}
];

const Sidebar = () => {
  return (
    <aside className='w-64 min-h-screen p-6 bg-gray-900 text-white shadow-lg'>
    <Link to='/dashboard' className='text-2xl font-bold mb-8 tracking-wide hover:text-blue-400
    transition'>Neobank</Link>
    <nav className='flex flex-col gap-2'>
        {navItems.map(({label,path,icon})=>(
            <NavLink key={path} to={path}
            className={({isActive})=> `flex items-center gap-3 px-5 py-3 rounded-lg font-medium transition-colors duration-200 
              ${
                isActive
                  ? 'bg-blue-600 text-white shadow-inner pl-4 ml-1 border-l-4 border-blue-400'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            aria-current={({isActive})=>(isActive?'page':undefined)}>
            {icon}{label}</NavLink>
        ))}
    </nav>
    </aside>
  )
}

export default Sidebar

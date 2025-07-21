import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import React from 'react'

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar/>
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Outlet/>
      </main>
    </div>
  )
}

export default DashboardLayout

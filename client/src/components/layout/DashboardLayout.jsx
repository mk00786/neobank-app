import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import React from 'react'

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar/>
      <main className="flex-1 p-6">
        <Outlet/>
      </main>
    </div>
  )
}

export default DashboardLayout

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import React from 'react'

const DashboardLayout = () => {
  return (
    <aside className="w-64 h-screen sticky top-0 bg-white shadow">
      <Sidebar/>
      <main className="flex-1 p-6">
        <Outlet/>
      </main>
    </aside>
  )
}

export default DashboardLayout

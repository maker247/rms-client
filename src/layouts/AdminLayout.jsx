import { Outlet } from "react-router-dom"

import { Header } from "@/components/admin/Header"

import { SideBar } from "@/components/admin/SideBar"


export function AdminLayout() {
  return (
    <div className="w-full min-h-[100vh] flex flex-row bg-slate-950">      

      <SideBar />

      <div className="w-full">
        <Header />
        <Outlet />
      </div>

    </div>
  )
}
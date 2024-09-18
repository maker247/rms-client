import { 
  Outlet,
  Navigate
} from "react-router-dom"

import { Header } from "@/components/admin/Header"

import { SideBar } from "@/components/admin/SideBar"

import { getToken } from "@/lib/admin/utils"

export function AdminLayout() {
  const token = getToken()

  if(! token) return <Navigate to="/admin/login" />

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
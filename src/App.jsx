import { 
  createBrowserRouter, 
  RouterProvider 
} from "react-router-dom"

import { AdminLayout } from "@/layouts/AdminLayout"

import { Dashboard } from "./pages/admin/Dashboard"

import { UserIndex } from "@/pages/admin/users/UserIndex"

import { UserCreate } from "@/pages/admin/users/UserCreate"

import { UserEdit } from "@/pages/admin/users/UserEdit"

import { Login } from "./pages/admin/Login"

import { Toaster } from "@/components/ui/toaster"

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
        {
            path: "dashboard",
            element: <Dashboard />
        },
        {
            path: "users",
            element: <UserIndex />
        },
        {
          path: "users/create",
          element: <UserCreate />
        },
        {
          path: "users/:uuid",
          element: <UserEdit />
        }
    ]
  },
  {
    path: "/admin/login",
    element: <Login/>
  }
])

export function App() {
  return (
    <>
      <Toaster />

      <RouterProvider router={router} />
    </>    
  )
}

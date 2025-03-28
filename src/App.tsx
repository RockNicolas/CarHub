import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { New } from './pages/Dashboard/new/New'
import { CarDetail } from './pages/Car/Car'
import { Layout } from './components/Layouts/Layouts'

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/car/:id",
          element: <CarDetail/>
        },
        {
          path: "/dashboard",
          element: <Dashboard/>
        },
        {
          path: "/dashboard/new",
          element: <New/>
        }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  }
])
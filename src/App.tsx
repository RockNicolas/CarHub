import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { New } from './pages/Dashboard/new/New'
import { CarDetail } from './pages/Car/Car'
import { Layout } from './components/Layouts/Layouts'
import { Private } from './routes/Private'

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
          element: <Private><Dashboard/></Private>
        },
        {
          path: "/dashboard/new",
          element: <Private><New/></Private>
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
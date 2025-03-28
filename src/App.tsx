import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { New } from './pages/Dashboard/new/New'
import { Car, CarDetail } from './pages/Car/Car'
import { Header } from './components/Header/Header'
import { Layout } from './components/Layouts/Layouts'

const router = createBrowserRouter([
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
        }
    ]
  }
])
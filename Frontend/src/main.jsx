import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './Components/Layout'
import Login from './Components/Auth/Login'
import CartItem from './Components/CartItem'
import Checkout from './Components/Checkout'
import Providers from './Components/Providers'
import Register from './Components/Auth/Register'
import ContactForm from './Components/ContactForm'
import ProductList from './Components/ProductList'
import ProductDetails from './Components/ProductDetails'
import ProtectedRoute from './Components/Auth/ProtectedRoute'

import Home from './Pages/Home'
import OrderHistory from './Pages/OrderHistory'
import ProfilePage from './Pages/ProfilePage'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <ProductList /> },
      { path: "product/:productId", element: <ProductDetails /> },
      { path: "cart", element: <CartItem /> },
      { 
        path: "checkout", 
        element: <ProtectedRoute><Checkout /></ProtectedRoute> 
      },
      { 
        path: "order-history", 
        element: <ProtectedRoute><OrderHistory /></ProtectedRoute> 
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "contact", element: <ContactForm /> },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      { path: "*", element: <h2>Page Not Found</h2> },
    ],
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers> 
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);

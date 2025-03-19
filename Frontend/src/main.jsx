import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Providers from './Components/Providers'; 
import Layout from './Components/Layout';
import Home from './Pages/Home';
import ProductList from './Components/ProductList';
import ProductDetails from './Components/ProductDetails';
import CartItem from './Components/CartItem';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import Checkout from './Components/Checkout';
import OrderHistory from './Pages/OrderHistory';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import ContactForm from './Components/ContactForm';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,  // Layout wrapper with Navbar and Outlet
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
      { path: "*", element: <h2>Page Not Found</h2> },
    ],
  },
]);

//Wrap app inside Providers to fix Redux & Context issues
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers> {/* Now Redux & Cart Context are available globally */}
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);

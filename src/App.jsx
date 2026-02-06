import React from 'react'
import { Toaster } from "react-hot-toast";
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import Products from './pages/Products';
import ProductDetails from "./component/product/ProductDetails";
import Orders from './pages/Orders';
import WishList from './pages/WishList';
import Cart from './pages/Cart';
import ProtectedRoute from './hoc/ProtectedRoutes';
import Adminlayout from './layouts/Adminlayout';

const AdminUsers = React.lazy(() => import('./pages/admin/Users'))
const AdminUserDetails = React.lazy(() => import('./pages/admin/UserDetails'))
const AdminProducts = React.lazy(() => import('./pages/admin/Products'))
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'))

function App() {


  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="orders" element={<Orders />} />
          <Route path="product" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="wishlist" element={<WishList />} />
          <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        </Route>
      </Routes>

      <Routes>
        <Route path="/admin" element={<Adminlayout />}>
          <Route index element={<React.Suspense fallback={<div className="p-6">Loading...</div>}><AdminDashboard /></React.Suspense>} />
          <Route path="users" element={<React.Suspense fallback={<div className="p-6">Loading...</div>}><AdminUsers /></React.Suspense>} />
          <Route path="users/:id" element={<React.Suspense fallback={<div className="p-6">Loading...</div>}><AdminUserDetails /></React.Suspense>} />
          <Route path="products" element={<React.Suspense fallback={<div className="p-6">Loading...</div>}><AdminProducts /></React.Suspense>} />
          <Route path="dashboard" element={<React.Suspense fallback={<div className="p-6">Loading...</div>}><AdminDashboard /></React.Suspense>} />
        </Route>
      </Routes>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>


    </>
  )
}

export default App
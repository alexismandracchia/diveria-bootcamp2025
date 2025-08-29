import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import ProductForm from './pages/ProductForm.jsx'
import Footer from './components/Footer.jsx'
import './assets/styles.css'

export default function App() {
  return (
    <>
      <Header />
      <div className="container-fluid m-0 p-0">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/create" element={<ProductForm />} />
            <Route path="/edit/:id" element={<ProductForm />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

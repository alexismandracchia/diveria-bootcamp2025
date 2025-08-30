import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import ProductDetail from '../components/ProductDetail'
import Results from '../components/Results'
 

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items/:id" element={<ProductDetail />} />
            <Route path="/items" element={<Results />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
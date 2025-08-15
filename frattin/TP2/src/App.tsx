import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/home";
import Product from "./pages/product/product";
import NotFound from "./pages/not-found/not-found";
import ThemeToggle from "./components/themeToggle/themeToggle";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

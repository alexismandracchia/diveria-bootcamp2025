import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList/productList";
import "./home.css"

export default function Home() {
  return (
    <>
      <header>
        <h1>Welcome to the Home Page</h1>
      </header>
      <div className="products-container">
        <ProductList />
      </div>
    </>
  );
}

import { ProductProvider } from "./components/ProductContext";
import ProductManagement from "./components/ProductManagement";

const ProductsPage = () => {
  return (
    <ProductProvider>
      <ProductManagement />
    </ProductProvider>
  );
};

export default ProductsPage;

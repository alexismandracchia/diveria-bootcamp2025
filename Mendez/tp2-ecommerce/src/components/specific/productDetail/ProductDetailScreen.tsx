import { Container, Typography, Box } from "@mui/material";
import LoadingSpinner from "../../general/spinner/LoadingSpinner";
import { useProductDetail } from "../../../hooks/useProductDetail";
import { ProductImageGallery } from "./components/ProductImageGallery";
import { ProductInfo } from "./components/ProductInfo";
import { ProductDescription } from "./components/ProductDescription";

const ProductDetailScreen = () => {
  const { product, isLoading, error } = useProductDetail();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <Container>
        <Typography variant="h5" color="error" sx={{ mt: 4 }}>
          {error || "Producto no encontrado."}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          background: "white",
          color: "black",
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden', 
        }}
      >
        <ProductImageGallery images={product.images} />
        <ProductInfo product={product} />
      </Box>

      <ProductDescription description={product.description} />
    </Container>
  );
};

export default ProductDetailScreen;
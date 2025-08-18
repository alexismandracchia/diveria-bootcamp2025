import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../../../general/cards/ProductCard";
import LoadingSpinner from "../../../general/spinner/LoadingSpinner";
import type { ProductListProps } from "../../../../types/ProductsTypes";

const ProductList = ({ products, isLoading }: ProductListProps) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoading && products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">No se encontraron productos.</Typography>
        <Typography color="text.secondary">Intenta con otra búsqueda.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "calc(100vh - 150px)", overflowY: "auto", p: 1 }}>
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12 }} >   
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
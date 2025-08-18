import { Box, Typography, Button, Rating, Chip } from "@mui/material";
import type { IProduct } from "../../../../types/ProductsTypes";
import { LocalShipping } from "@mui/icons-material";

const DISCOUNT_PERCENTAGE = 15;

const calculatePrice = (basePrice: number, discountPercentage: number) => {
  const discountedPrice = basePrice * (1 - discountPercentage / 100);
  return {
    original: basePrice,
    discounted: discountedPrice,
    discountPercentage,
  };
};

interface ProductInfoProps {
  product: IProduct;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const priceDetails = calculatePrice(product.price, DISCOUNT_PERCENTAGE);

  const productRating = 4.5; 
  const productReviews = 125; 
  const paymentMethods = ["Visa", "Mastercard", "Mercado Pago"];

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">{product.title}</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Rating name="product-rating" value={productRating} precision={0.5} readOnly />
        <Typography variant="body2" color="text.secondary">
          ({productReviews} opiniones)
        </Typography>
      </Box>
      
      <Box>
        <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
          ${priceDetails.original.toLocaleString()}
        </Typography>
        <Typography variant="h5" color="primary" fontWeight="bold">
          ${priceDetails.discounted.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          <Typography component="span" variant="body2" color="error" fontWeight="bold" ml={1}>
            {priceDetails.discountPercentage}% OFF
          </Typography>
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="body2" sx={{ color: "success.main", fontWeight: "bold" }}>
          En stock
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: "success.main" }}>
          <LocalShipping fontSize="small" />
          <Typography variant="body2" fontWeight="bold">
            Envío gratis
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary">
        Categoría: {product.category?.name}
      </Typography>

      <Box mb={3}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          Medios de pago
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {paymentMethods.map((method) => (
            <Chip key={method} label={method} variant="outlined" size="small" />
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 'auto' }}>
        <Button variant="contained" size="large">Comprar</Button>
        <Button variant="outlined" size="large">Agregar al Carrito</Button>
      </Box>
    </Box>
  );
};
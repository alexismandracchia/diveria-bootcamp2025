import { Box, Typography } from "@mui/material";

interface ProductDescriptionProps {
  description: string;
}

export const ProductDescription = ({ description }: ProductDescriptionProps) => (
  <Box sx={{ background: "white", color: "black", boxShadow: 3, borderRadius: 2, p: 2, my: 2 }}>
    <Typography variant="h5">Descripción</Typography>
    <Typography color="text.secondary">{description}</Typography>
  </Box>
);
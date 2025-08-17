import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import type { IProductCardProps } from "../../../types/ProductsTypes"; 
import { useNavigate } from "react-router";


const ProductCard = ({ product }: IProductCardProps) => {
  const { id, title, description, images, price } = product;
  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate(`/product/${id}`);
  };

  const displayImage = images?.[0] || "https://via.placeholder.com/200";

  return (
    <Card sx={{ width: "100%" }}>
      <CardActionArea
        onClick={handleRedirection}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            width: "15rem",
            maxWidth: "50%",
            maxHeight: "20rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            image={displayImage}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <CardContent
          sx={{
            width: "50%",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            gutterBottom
            component="div"
            sx={{
              fontSize: "clamp(1rem, 5vw, 1.5rem)",
              fontWeight: 600,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{
              display: { xs: "none", sm: "-webkit-box" },
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </Typography>
          <Typography
            sx={{
              fontSize: "clamp(1rem, 5vw, 2rem)",
              fontWeight: 700,
            }}
          >
            $ {price}
          </Typography>
          <Typography
            sx={{
              fontSize: "clamp(0.5rem, 5vw, 0.8rem)",
              fontWeight: 700,
            }}
            color="success.main"
          >
            Envío gratis
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
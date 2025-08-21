import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductServices } from '../api/axiosApiService';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
  Chip,
  Rating,
  Divider,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Componente personalizado para las flechas del carrusel
const SampleNextArrow = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        width: 50,
        height: 50,
        position: 'absolute',
        right: '40px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.9)'
        }
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

const SamplePrevArrow = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        width: 50,
        height: 50,
        position: 'absolute',
        left: '40px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.9)'
        }
      }}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Configuración del carrusel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => setCurrentSlide(next),
    appendDots: dots => (
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
        }}
      >
        {dots}
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: currentSlide === i ? 'primary.main' : 'grey.300',
          margin: '0 4px',
          cursor: 'pointer'
        }}
      />
    )
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await ProductServices.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4">Producto no encontrado</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Container maxWidth="xl">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 3,
            border: 'solid 1px'

          }}
        >
          Volver
        </Button>
        <Container sx={{ display: { xs: 'block', md: 'flex' } }}>
          <Box sx={{
            margin: 'auto',
            marginBottom: 5,
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
            maxWidth: '600px'
          }}>
            {product.images?.length > 0 ? (
              <Slider {...sliderSettings}>
                {product.images.map((image, index) => (
                  <Box key={index} sx={{ height: '500px', position: 'relative' }}>
                    <img
                      src={image}
                      alt={`${product.title} - ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        backgroundColor: '#f5f5f5'
                      }}
                    />
                  </Box>
                ))}
              </Slider>
            ) : (
              <Box sx={{
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5'
              }}>
                <Typography variant="h6">No hay imágenes disponibles</Typography>
              </Box>
            )}
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            px: { xs: 0, md: 4 }
          }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {product.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating
                value={product.rating?.rate || 0}
                precision={0.5}
                readOnly
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" sx={{ mr: 2 }}>
                ({product.rating?.count || 0} reseñas)
              </Typography>
              <Chip
                label={product.category?.name || 'Sin categoría'}
                color="secondary"
                size="small"
              />
            </Box>

            <Typography variant="h4" color="primary" sx={{
              fontWeight: 'bold',
              mb: 3,
              py: 1,
              borderBottom: '2px solid',
              borderColor: 'divider',
              display: 'inline-block'
            }}>
              ${product.price}
            </Typography>

            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ShoppingCartIcon />}
                sx={{ flex: 1, py: 1.5 }}
              >
                Agregar al carrito
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<FavoriteBorderIcon />}
                sx={{ py: 1.5 }}
              >
                Favorito
              </Button>
            </Box>
          </Box>
        </Container>
      </Container>
    </Container>
  );
};

export default ProductDetail;
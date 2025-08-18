import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductServices } from '../api/axiosApiService';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box,
  CircularProgress,
  Button,
  Chip,
  Pagination
} from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const itemsPerPage = 12;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Usamos el servicio de API
        const results = await ProductServices.serchProducts(searchTerm);
        
        setProducts(results);
        setFilteredProducts(results);
        setTotalPages(Math.ceil(results.length / itemsPerPage));
        setPage(1); // Resetear a primera página al hacer nueva búsqueda
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error al cargar los productos. Por favor intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  const handleProductClick = (id) => {
    navigate(`/items/${id}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    if (searchTerm.trim()) {
      navigate(`/items?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Calcular productos para la página actual
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10, minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center', minHeight: '60vh' }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Reintentar
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
      <Container>
        <Box component="form" onSubmit={handleSearchSubmit} sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 4,
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1
        }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar productos..."
            name="search"
            defaultValue={new URLSearchParams(location.search).get('search') || ''}
            sx={{ flexGrow: 1 }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            startIcon={<SearchIcon />}
            sx={{ px: 4 }}
          >
            Buscar
          </Button>
          {/* Me Faltan implementar los filtros!
          <Button 
            variant="outlined"
          ><FilterListIcon />
          </Button> */}
        </Box>
      </Container>

      {/* Resultados */}
      <Container>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        {products.length > 0 ? (
          <>
            <Button 
              startIcon={<ArrowBackIcon />} 
              onClick={() => navigate(-1)}
              sx={{ mb: 2, border:'solid 1px' }}
            >
              Volver
            </Button>
            <br />
            Resultados para "<strong>{new URLSearchParams(location.search).get('search')}</strong>"
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
            </Typography>
          </>
        ) : (
            <Box sx={{ 
              textAlign: 'center', 
              mt: 10,
              minHeight: '50vh'
            }}>
              <Typography variant="h5" gutterBottom>
                No encontramos productos con ese nombre
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Intenta con otro término de búsqueda
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/')}
                startIcon={<SearchIcon />}
              >
                Volver a buscar
              </Button>
            </Box>
        )}
        </Typography>
      </Container>

      {paginatedProducts.length > 0 && (
        <>
          <Grid container spacing={4} sx={{ display:'flex', justifyContent:'center' }}>
            {paginatedProducts.map((product) => (
              <Grid item key={product.id} >
                <Card 
                  sx={{ 
                    width:275,
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor:'pointer',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}
                  onClick={() => handleProductClick(product.id)}
                >
                  <CardMedia
                    component="img"
                    image={product.images?.[0] || '/placeholder-product.jpg'}
                    alt={product.title}
                    sx={{ 
                      height: 200, 
                      objectFit: 'contain', 
                      p: 2,
                      bgcolor: '#f5f5f5'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                      {product.title}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                      ${product.price}
                    </Typography>
                    {product.category?.name && (
                      <Chip 
                        label={product.category.name} 
                        size="small" 
                        sx={{ mb: 1 }} 
                      />
                    )}
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {product.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Paginación */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                sx={{ '& .MuiPaginationItem-root': { fontSize: '1rem' } }}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchResults;
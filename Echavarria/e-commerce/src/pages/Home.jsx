import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent, Chip, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ProductServices } from "../api/axiosApiService";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    //const navigate = useNavigate();

    // --------------------------------------------
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10; // 10 productos por página
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            setLoading(true);
            const { products, total } = await ProductServices.getPaginatedProducts(page, itemsPerPage);
            setProducts(products);
            setTotalPages(Math.ceil(total / itemsPerPage));
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
        };
        fetchProducts();
    }, [page]);

    const handleSearch = (e) => {
        e.preventDefault();
        if(searchTerm.trim()) {
            navigate(`/items?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleProductClick = (id) => {
        navigate(`/items/${id}`);
    };

    if (loading && products.length === 0) {
        return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <CircularProgress size={60} />
        </Box>
        );
    }


    return(
        <Container maxWidth="xl" sx={{ mt:4 }}>
            <Box sx={{ textAlign: 'center', mb:4 }}>
                <Typography variant="h3" gutterBottom>
                    Biennvenido
                </Typography>
                <Typography variant="subtitle1">
                    Encuentra el producto que deseas
                </Typography>
            </Box>

            <Box maxWidth="lg" component="form" onSubmit={handleSearch} sx={{ display: 'flex',margin:'auto', gap:2 }}>
                <TextField 
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange = {(e) => setSearchTerm(e.target.value)}
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    startIcon={<SearchIcon/>}
                    sx={{ px:4 }}>
                    Buscar
                </Button>
            </Box>

            {/* -------------------------------------------------- */}

            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ 
                    fontWeight: 'bold', 
                    mb: 4,
                    textAlign: 'center',
                    color: 'primary.main'
                }}>
                    Nuestros Productos
                </Typography>

                {products.length > 0 ? (
                    <>
                    <Grid container spacing={4} sx={{ justifyContent:'center'}}>
                        {products.map((product) => (
                        <Grid key={product.id}>
                            <Card
                                sx={{ 
                                    width:300,
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
                                <Box sx={{ p: 2 }}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => handleProductClick(product.id)}  
                                    >
                                    Ver Detalles
                                    </Button>
                                </Box>

                            </Card>
                        </Grid>
                        ))}
                    </Grid>

                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            showFirstButton
                            showLastButton
                            sx={{
                            '& .MuiPaginationItem-root': {
                                fontSize: '1rem',
                                '&.Mui-selected': {
                                fontWeight: 'bold'
                                }
                            }
                            }}
                        />
                        </Box>
                    )}
                    </>
                ) : (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                    <Typography variant="h5" gutterBottom>
                        No se encontraron productos
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Actualmente no tenemos productos disponibles.
                    </Typography>
                    </Box>
                )}
                </Container>
        </Container>
    );
};

export default Home;
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../services/api';
import { Box, Grid, GridItem, Image, Heading, Text, Badge, Button, Stack, Skeleton } from '@chakra-ui/react';

export default function ProductDetailPage(){
    const { id } = useParams();

    const { data: p, isLoading, isError, error} = useQuery ({
        queryKey: ['product', id],
        queryFn: () => getProduct(id),
    });
    
    if (isLoading) return <Skeleton h="400px" />;
    
    if (isError) return <Text color="red.300">Error: {error.message}</Text>;

    const img = Array.isArray(p?.images) && p.images.length 
                  ? p.images[0]
                  : (typeof p?.images === 'string' ? p.images: 'https://via.placeholder.com/600x400?text=No+Image');

    return (
        <Grid templateColumns={{ base: '1fr', md: '1fr 1.2fr'}} gap={6}>
            <GridItem>
                <Image src={img} alt={p.title} borderRadius="md" />
            </GridItem>

            <GridItem>
                <Stack spacing={3}>
                    <Badge alignSelf="start" colorScheme="teal">{p.category?.name}</Badge>
                    <Heading size="lg">{p.title}</Heading>
                    <Text fontSize="x1" fontWeight="bold">${p.price}</Text>
                    <Text whiteSpace="pre-wrap" opacity={0.9}>{p.description}</Text>
                    <Box>
                        <Button colorSheme="teal" mr={3}>Agregar al Carrito</Button>
                        <Button as={RouterLink} to="/items?search=" variant="outline">Volver a Resultados</Button>
                    </Box>
                </Stack>
            </GridItem>
        </Grid>                
    );
}
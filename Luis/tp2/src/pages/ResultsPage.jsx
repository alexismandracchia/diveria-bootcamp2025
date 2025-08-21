import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Heading,
  Text,
  SimpleGrid,
  Spinner,
  Center,
  Box
} from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import { searchProducts } from '../services/api'; 

export default function ResultsPage() {
  const [params] = useSearchParams();
  const query = (params.get('search') || '').trim();

  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    let ignore = false;
    async function run() {
      if (!query) {
        setProducts([]);
        return;
      }
      setLoading(true);
      try {
        const data = await searchProducts(query); 
        if (!ignore) setProducts(data);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => { ignore = true; };
  }, [query]);

  if (!query) {
    return (
      <Box>
        <Heading size="lg" mb={2}>Resultados</Heading>
        <Text opacity={0.8}>Usá la búsqueda de arriba o volvé al inicio.</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Resultados para “{query}”
        {products.length ? ` (${products.length})` : ''}
      </Heading>

      {loading && (
        <Center py={16}>
          <Spinner size="lg" />
        </Center>
      )}

      {!loading && products.length === 0 && (
        <Text opacity={0.8}>No se encontraron productos.</Text>
      )}

      {!loading && products.length > 0 && (
        <SimpleGrid
          mt={2}
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={6}
          w="100%"
        >
          {products.map(p => (
            <ProductCard key={p.id} product={p} as={Link} to={`/items/${p.id}`} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

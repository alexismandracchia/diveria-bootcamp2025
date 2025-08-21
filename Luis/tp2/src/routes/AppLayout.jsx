import { Link, Outlet, useSearchParams } from 'react-router-dom';
import { Box, Container, VStack, HStack, Heading, useColorModeValue} from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';

export default function AppLayout() {
  const bg = useColorModeValue('gray.900', 'gray.800');
  const [params] = useSearchParams();
  const initialQuery = params.get('search') || '';

  return (
    <Box minH="100vh" bg={bg}>
     <Container maxW="container.xl" py={{ base: 6, md: 10 }}>
        <VStack spacing={6} align="center" textAlign="center">
          <HStack spacing={3}>
            <Heading
              as={Link}
              to="/"
              size="lg"
              bgGradient="linear(to-r, teal.300, cyan.400)"
              bgClip="text"
              letterSpacing="wide"
            >
              NeoShop
            </Heading>

          </HStack>

          
          <Box w="100%" maxW="720px">
            <SearchBar initialValue={initialQuery} />
          </Box>
        </VStack>
      <Container maxW="container.xl" pb={{ base: 10, md: 14 }}>
        <Outlet />
      </Container>
    </Container>
  </Box>
  );
}

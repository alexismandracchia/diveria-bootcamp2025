import { useState } from 'react';
import { HStack, Input, Button, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ initialValue = '' }) {
  const [q, setQ] = useState(initialValue);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const query = q.trim();
    navigate(query ? `/items?search=${encodeURIComponent(query)}` : '/items?search=');
  };

  return (
    <Box as="form" onSubmit={onSubmit} w="full" display="flex" justifyContent="center">
      <HStack
        w="full"
        maxW="720px"        
        spacing={3}
      >
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar productos…"
          bg="blackAlpha.200"
          _dark={{ bg: 'whiteAlpha.200' }}
        />
        <Button type="submit" colorScheme="teal">Buscar</Button>
      </HStack>
    </Box>
  );
}

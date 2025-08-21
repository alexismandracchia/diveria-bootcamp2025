import { Heading, Text, VStack, Center } from '@chakra-ui/react';

export default function SearchPage() {
  return (
    <Center as="section" py={{ base: 10, md: 16 }}>
      <VStack spacing={3} align="center" textAlign="center" maxW="3xl" w="full" px={4}>
        <Heading size="lg">Caja de Busqueda</Heading>
        <Text opacity={0.8}>
          Escribí arriba lo que querés encontrar y apretá en “Buscar”.
        </Text>
      </VStack>
    </Center>
  );
}

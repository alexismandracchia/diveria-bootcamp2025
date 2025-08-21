import { VStack, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <VStack spacing={3} align="start">
            <Heading size="lg">Pagina no Encontrada</Heading>
            <Text> La ruta que intentaste abrir no existe.</Text>
            <Button as={Link} to="/" colorScheme="teal">Ir a la busqueda</Button>
        </VStack>
    );
}
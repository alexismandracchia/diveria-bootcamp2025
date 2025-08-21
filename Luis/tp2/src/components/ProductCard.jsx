import { Card, CardBody, Image, Heading, Text, Badge, Stack } from '@chakra-ui/react';

export default function ProductCard({ product, ...rest }) {
  return (
    <Card h="full" {...rest}>
      <Image
        src={product.images?.[0]}
        alt={product.title}
        w="100%"
        h="200px"
        objectFit="cover"
        borderTopRadius="md"
      />
      <CardBody>
        <Stack spacing={2}>
          <Heading size="sm" noOfLines={2}>{product.title}</Heading>
          <Text fontWeight="bold">${product.price}</Text>
          {product.category?.name && (
            <Badge variant="subtle">{product.category.name}</Badge>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

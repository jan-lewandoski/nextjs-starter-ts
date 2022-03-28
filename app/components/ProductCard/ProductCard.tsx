import { Box, Badge, SimpleGrid, Button } from '@chakra-ui/react'
import Rating from '@components/Rating/Rating'
import { Product } from '@customTypes/products/Product'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
  buttonText: string
  // eslint-disable-next-line
  onAddToCart: (product: Product) => void
}

const ProductCard = ({ product, buttonText, onAddToCart }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <a>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image
            width="16"
            height="9"
            layout="responsive"
            objectFit="contain"
            src={product.image}
            alt={`${product.title} image`}
          />

          <SimpleGrid columns={1} p="6" gap={1}>
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {product.category}
              </Box>
            </Box>

            <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              {product.description}
            </Box>

            <Box>${product.price}</Box>

            <Rating rating={product.rating} size="sm" />

            <Button
              variant={'outline'}
              size={'sm'}
              mt={2}
              onClick={(e) => {
                e.preventDefault()
                onAddToCart(product)
              }}
            >
              {buttonText}
            </Button>
          </SimpleGrid>
        </Box>
      </a>
    </Link>
  )
}

export default ProductCard

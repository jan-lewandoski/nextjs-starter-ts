import { gql } from '@apollo/client'
import { Button, SimpleGrid, VStack } from '@chakra-ui/react'
import ProductCard from '@components/ProductCard/ProductCard'
import { APP_DOMAIN_URL } from '@constants/common'
import useCart from '@hooks/cart/useCart'
import { apolloClient } from 'graphql/apolloClient'
import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { Product } from '../../app/types/products/Product'

const ProductsPage = ({ products }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { addToCart } = useCart()

  return (
    <VStack gap={2} pb={8}>
      <NextSeo
        title={'Products'}
        description={'Products page description'}
        canonical={`${APP_DOMAIN_URL}/products`}
      ></NextSeo>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} p={{ base: 2, md: 4 }}>
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            buttonText="Add to cart"
          />
        ))}
      </SimpleGrid>

      {products.length > 0 && (
        <Button isLoading={false} colorScheme="blue" loadingText="Loading..." onClick={() => {}}>
          Load more
        </Button>
      )}
    </VStack>
  )
}
export const getStaticProps = async () => {
  const { data } = await apolloClient.query({
    query: gql`
      query GetAllProducts {
        products {
          id
          slug
          name
          price
          images(first: 1) {
            url
          }
          categories {
            name
          }
        }
      }
    `,
  })

  return {
    props: {
      products: data.products,
    },
  }
}
export default ProductsPage

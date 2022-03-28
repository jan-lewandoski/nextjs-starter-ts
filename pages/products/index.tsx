import api from '@api/api'
import { Button, SimpleGrid, VStack } from '@chakra-ui/react'
import ProductCard from '@components/ProductCard/ProductCard'
import { APP_DOMAIN_URL } from '@constants/common'
import useCart from '@hooks/cart/useCart'
import useProducts from '@hooks/products/useProducts'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { useEffect } from 'react'
import { Product } from '../../app/types/products/Product'

interface ProductsPageProps {
  initialProducts: Product[]
}

const ProductsPage = ({ initialProducts }: ProductsPageProps) => {
  const { t } = useTranslation()

  const { products, loading, changeProducts, loadMoreProducts } = useProducts()

  const { addToCart } = useCart()

  useEffect(() => {
    if (!products.length) {
      changeProducts(initialProducts)
    }
  }, [])

  return (
    <VStack gap={2} pb={8}>
      <NextSeo
        title={t('products:title')}
        description={t('products:description')}
        canonical={`${APP_DOMAIN_URL}/products`}
      ></NextSeo>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} p={{ base: 2, md: 4 }}>
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            buttonText={t('common:add-to-cart')}
          />
        ))}
      </SimpleGrid>

      {products.length > 0 && (
        <Button
          isLoading={loading}
          colorScheme="blue"
          loadingText={t('common:loading')}
          onClick={loadMoreProducts}
        >
          {t('common:load-more')}
        </Button>
      )}
    </VStack>
  )
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const initialProducts: Product[] = await api.getProducts({ take: 12, offset: 0 })

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'navigation', 'products'])),
      initialProducts,
    },
  }
}

export default ProductsPage

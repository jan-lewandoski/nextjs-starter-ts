import api from '@api/api'
import Button from '@components/Button/Button'
import Layout from '@components/Layout/Layout'
import ProductCard from '@components/ProductCard/ProductCard'
import { APP_DOMAIN_URL } from '@constants/common'
import { INITIAL_PAGINATION } from '@constants/products'
import useProducts from '@hooks/products/useProducts'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { useEffect } from 'react'
import { Product } from '../../app/types/products/Product'

interface ProductsPageProps {
  initialProducts: Product[]
}

const ProductsPage = ({ initialProducts }: ProductsPageProps) => {
  const { t } = useTranslation()

  const { products, loading, setProducts, loadMoreProducts } = useProducts()

  useEffect(() => {
    if (!products.length) {
      setProducts(initialProducts)
    }
  }, [])

  return (
    <Layout>
      <Head>
        <title>{t('products:title')}</title>
        <meta name="description" content={t('products:description')}></meta>
      </Head>

      <NextSeo
        title={t('products:title')}
        description={t('products:description')}
        canonical={`${APP_DOMAIN_URL}/products`}
      ></NextSeo>

      <div className="p-4 lg:p-6 xl:p-8 max-w-7xl m-auto grid gap-4">
        <h1 className="sr-only">{t('products:title')}</h1>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products.length > 0 && (
          <Button loading={loading} className="place-self-center" onClick={loadMoreProducts}>
            {t(loading ? 'common:loading' : 'common:load-more')}
          </Button>
        )}
      </div>
    </Layout>
  )
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const initialProducts: Product[] = await api.getProducts(INITIAL_PAGINATION)

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'navigation', 'products'])),
      initialProducts,
    },
  }
}

export default ProductsPage

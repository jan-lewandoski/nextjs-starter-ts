import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Button from '../../components/Button/Button'
import ProductCard from '../../components/ProductCard/ProductCard'
import { INITIAL_PAGINATION, OFFSET_INCREMENT } from '../../constants/products-constants'
import useDidMountEffect from '../../hooks/common/useDidMountEffect'
import { Pagination } from '../../types/products/Pagination'
import { Product } from '../../types/products/Product'

interface ProductsPageProps {
  products: Product[]
}

export const getProducts = async (pagination: Pagination): Promise<Product[]> => {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${pagination.take}&offset=${pagination.offset}`,
  )
  const data = await res.json()

  return data
}

const ProductsPage = ({ products }: ProductsPageProps) => {
  const { t } = useTranslation()

  const [pagination, setPagination] = useState<Pagination>(INITIAL_PAGINATION)
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])

  const { data, isFetching, refetch } = useQuery('products', () => getProducts(pagination), {
    enabled: false,
    initialData: products,
  })

  const loadMoreProducts = () => {
    setPagination((pagination) => ({ ...pagination, offset: pagination.offset + OFFSET_INCREMENT }))
  }

  useEffect(() => {
    if (data) {
      setDisplayedProducts((products) => [...products, ...data])
    }
  }, [data])

  useDidMountEffect(() => {
    refetch()
  }, [pagination])

  return (
    <>
      <Head>
        <title>{t('products:title')}</title>
        <meta name="description" content={t('products:description')}></meta>
      </Head>

      <div className="p-4 lg:p-6 xl:p-8 max-w-xxl m-auto grid gap-4">
        <h1 className="sr-only">{t('products:title')}</h1>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {displayedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Button loading={isFetching} className="place-self-center" onClick={loadMoreProducts}>
          {t(isFetching ? 'common:loading' : 'common:load-more')}
        </Button>
      </div>
    </>
  )
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const products: Product[] = await getProducts(INITIAL_PAGINATION)

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'navigation', 'products'])),
      products,
    },
  }
}

export default ProductsPage

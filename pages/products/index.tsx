import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import ProductCard from '../../components/ProductCard/ProductCard'
import { INITIAL_PAGINATION, OFFSET_INCREMENT } from '../../constants/products-constants'
import { Pagination } from '../../types/products/Pagination'
import { Product } from '../../types/products/Product'

interface ProductsPageProps {
  products: Product[]
}

const ProductsPage = ({ products }: ProductsPageProps) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(products)
  const [pagination, setPagination] = useState<Pagination>(INITIAL_PAGINATION)

  const loadMoreProducts = () => {
    setPagination((pagination) => ({ ...pagination, offset: pagination.offset + OFFSET_INCREMENT }))
  }

  useEffect(() => {
    if (pagination.offset !== INITIAL_PAGINATION.offset) {
      setLoading(true)
      ;(async () => {
        const res = await fetch(
          `https://naszsklep-api.vercel.app/api/products?take=${pagination.take}&offset=${pagination.offset}`,
        )
        const data = await res.json()
        setDisplayedProducts((products) => [...products, ...data])
        setLoading(false)
      })()
    }
  }, [pagination])

  return (
    <div className="p-4 lg:p-6 xl:p-8 max-w-xxl m-auto grid gap-4">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {displayedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Button loading={loading} className="place-self-center" onClick={loadMoreProducts}>
        {t(loading ? 'common:loading' : 'common:load-more')}
      </Button>
    </div>
  )
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${INITIAL_PAGINATION.take}&offset=${INITIAL_PAGINATION.offset}`,
  )
  const products: Product[] = await res.json()

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'navigation'])),
      products,
    },
  }
}

export default ProductsPage

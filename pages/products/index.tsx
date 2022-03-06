import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ProductCard from '../../components/ProductCard/ProductCard'
import { Product } from '../../types/products/Product'

interface ProductsPageProps {
  products: Product[]
}

const ProductsPage = ({ products }: ProductsPageProps) => {
  return (
    <div className="md:p-4 lg:p-6 xl:p-8 max-w-xxl m-auto grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const res = await fetch('https://fakestoreapi.com/products')
  const products: Product[] = await res.json()

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'navigation'])),
      products,
    },
  }
}

export default ProductsPage

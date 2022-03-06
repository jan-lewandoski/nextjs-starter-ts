import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Breadcrumbs, { BreadrumbItem } from '../../components/Breadcrumbs/Breadcrumbs'
import Button from '../../components/Button/Buttons'
import { Product } from '../../types/products/Product'

interface ProductPageProps {
  product: Product
  breadcrumbs: BreadrumbItem[]
}

const ProductPage = ({ product, breadcrumbs }: ProductPageProps) => {
  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <div className="px-8 py-10 flex w-100 align-middle justify-between">
        <div className="w-2/5 max-w-md px-8">
          <Image
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            src={product.image}
            alt={`${product.title} image`}
          />
        </div>
        <div className="w-3/5 px-8 grid gap-4 h-fit">
          <h1 className="text-6xl font-bold">{product.title}</h1>
          <p className="text-lg font-semibold">${product.price}</p>
          <p className="text-md text-gray-700">{product.description}</p>
          <Button onClick={() => {}}> Add to cart </Button>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const res = await fetch(`https://fakestoreapi.com/products`)
  const products: Product[] = await res.json()

  return {
    paths: products.map((product) => ({ params: { productId: product.id.toString() } })),
    fallback: false,
  }
}

export const getStaticProps = async ({
  locale,
  params,
}: GetStaticPropsContext<{ productId: string }>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    }
  }

  const res = await fetch(`https://fakestoreapi.com/products/${params.productId}`)
  const product: Product = await res.json()

  const breadcrumbs: BreadrumbItem[] = [
    {
      text: 'Products',
      href: '/products',
    },
    {
      text: product.title,
    },
  ]

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'navigation'])),
      breadcrumbs,
      product,
    },
  }
}

export default ProductPage

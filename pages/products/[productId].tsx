import { GetStaticPathsContext, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { INITIAL_PAGINATION } from '../../constants/products-constants'
import Breadcrumbs, { BreadrumbItem } from '../../components/Breadcrumbs/Breadcrumbs'
import Button from '../../components/Button/Button'
import { Product } from '../../types/products/Product'

interface ProductPageProps {
  product: Product
  breadcrumbs: BreadrumbItem[]
}

const ProductPage = ({ product, breadcrumbs }: ProductPageProps) => {
  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-col px-4 py-6 w-100 lg:flex-row lg:justify-between lg:px-8 lg:py-10">
        <div className="w-1/2 max-w-sm self-center lg:w-2/5 lg:max-w-md lg:px-8">
          <Image
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            src={product.image}
            alt={`${product.title} image`}
          />
        </div>
        <div className="mt-4 grid gap-4 h-fit lg:w-3/5 lg:px-8 lg:mt-4">
          <h1 className="text-6xl font-bold">{product.title}</h1>
          <p className="text-lg font-semibold">${product.price}</p>
          <p className="text-md text-gray-700">{product.description}</p>
          <Button className="w-full lg:w-fit" onClick={() => {}}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${INITIAL_PAGINATION.take}&offset=${INITIAL_PAGINATION.offset}`,
  )
  const products: Product[] = await res.json()

  return {
    paths: locales
      ?.map((locale) =>
        products.map((product) => ({ params: { productId: product.id.toString() }, locale })),
      )
      .flat(),
    fallback: 'blocking',
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

  const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${params.productId}`)
  const product: Product = await res.json()

  if (!product) {
    return {
      props: {},
      notFound: true,
    }
  }

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

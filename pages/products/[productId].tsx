import { GetStaticPathsContext, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useMemo } from 'react'
import Breadcrumbs, { BreadrumbItem } from '@components/Breadcrumbs/Breadcrumbs'
import Button from '@components/Button/Button'
import api from '@api/api'
import { INITIAL_PAGINATION } from '@constants/products'
import WithLayout from '@hocs/WithLayout/WithLayout'
import { Product } from '@customTypes/products/Product'
import Markdown from '@components/Markdown/Markdown'
import Rating from '@components/Rating/Rating'
import { NextSeo } from 'next-seo'
import { APP_DOMAIN_URL } from '@constants/common'
import { useRouter } from 'next/router'

interface ProductPageProps {
  product: Product
  breadcrumbs: BreadrumbItem[]
}

const ProductPage = ({ product }: ProductPageProps) => {
  const breadcrumbs: BreadrumbItem[] = useMemo(() => {
    return [
      {
        text: 'Products',
        href: '/products',
      },
      {
        text: product.title,
      },
    ]
  }, [product])

  const { asPath } = useRouter()

  return (
    <>
      <NextSeo
        title={product.title}
        description={product.description}
        canonical={APP_DOMAIN_URL + asPath}
      ></NextSeo>

      <div>
        <Breadcrumbs items={breadcrumbs} />
        <div className="flex flex-col px-4 py-6 w-100 lg:flex-row lg:justify-between lg:px-8 lg:py-10">
          <div className="w-1/2 max-w-sm self-center lg:w-2/5 lg:max-w-md lg:px-8">
            <Image
              width="16"
              height="9"
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
            <Rating rating={product.rating} />
            <Button className="w-full lg:w-fit" onClick={() => {}}>
              Add to cart
            </Button>
          </div>
        </div>
        <div className="px-4 lg:px-8">
          <Markdown>{product.longDescription}</Markdown>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  const products: Product[] = await api.getProducts(INITIAL_PAGINATION)

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

  const product: Product = await api.getProduct(params.productId)

  if (!product) {
    return {
      props: {},
      notFound: true,
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'navigation'])),
      product,
    },
  }
}

export default WithLayout(ProductPage)

import { GetStaticPathsContext, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useMemo } from 'react'
import Breadcrumbs, { BreadrumbItem } from '@components/Breadcrumbs/Breadcrumbs'
import { Product } from '@customTypes/products/Product'
import Markdown from '@components/Markdown/Markdown'
import Rating from '@components/Rating/Rating'
import { NextSeo } from 'next-seo'
import { APP_DOMAIN_URL } from '@constants/common'
import { serialize } from 'next-mdx-remote/serialize'
import { MarkdownParsed } from '@customTypes/common/MarkdownParsed'
import { Button } from '@chakra-ui/react'
import { apolloClient } from 'graphql/apolloClient'
import {
  GetProductBySlugDocument,
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables,
  GetProductsSlugsDocument,
  GetProductsSlugsQuery,
  useCreateProductReviewMutation,
} from 'graphql/generated/graphql'
import ReviewForm, { FormData } from '@components/ReviewForm/ReviewForm'

type ProductWithMarkdown = Omit<Product, 'longDescription'> & { longDescription: MarkdownParsed }

interface ProductPageProps {
  product: ProductWithMarkdown
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
        text: product.name,
      },
    ]
  }, [product])

  const [createReview, { loading }] = useCreateProductReviewMutation()

  const addReview = (data: FormData) => {
    createReview({
      variables: {
        review: {
          name: 'Dummy User',
          email: 'user@example.com',
          product: {
            connect: {
              slug: product.slug,
            },
          },
          ...data,
        },
      },
    })
  }
  return (
    <>
      <NextSeo
        title={product.name}
        description={product.description}
        canonical={`${APP_DOMAIN_URL}/products/${product.slug}`}
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
              src={product.images?.length ? product.images[0].url : ''}
              alt={`${product.name} image`}
            />
          </div>
          <div className="mt-4 grid gap-4 h-fit lg:w-3/5 lg:px-8 lg:mt-4">
            <h1 className="text-6xl font-bold">{product.name}</h1>
            <p className="text-lg font-semibold">${product.price}</p>
            <p className="text-md text-gray-700">{product.description}</p>
            <Rating rating={{ count: 100, rate: 5 }} size="lg" />
            <Button colorScheme={'blue'}>Add to cart</Button>
          </div>
        </div>
        <div className="px-4 lg:px-8">
          <Markdown>{product.longDescription}</Markdown>
        </div>

        <ReviewForm onSubmit={addReview} loading={loading} />
      </div>
    </>
  )
}

export const getStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  const { data } = await apolloClient.query<GetProductsSlugsQuery>({
    query: GetProductsSlugsDocument,
  })

  return {
    paths: locales
      ?.map((locale) =>
        data.products.map((product) => ({ params: { slug: product.slug }, locale })),
      )
      .flat(),
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({
  locale,
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  if (!params?.slug) {
    return {
      props: {},
      notFound: true,
    }
  }

  const { data } = await apolloClient.query<GetProductBySlugQuery, GetProductBySlugQueryVariables>({
    variables: { slug: params.slug },
    query: GetProductBySlugDocument,
  })

  if (!data || !data.product) {
    return {
      props: {},
      notFound: true,
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'navigation'])),
      product: {
        ...data.product,
        longDescription: await serialize(data.product.description),
      },
    },
  }
}

export default ProductPage

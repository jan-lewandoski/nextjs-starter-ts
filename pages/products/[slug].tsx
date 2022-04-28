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
  GetProductReviewsDocument,
  GetProductReviewsQuery,
  GetProductsSlugsDocument,
  GetProductsSlugsQuery,
  useCreateProductReviewMutation,
  useGetProductReviewsQuery,
} from 'graphql/generated/graphql'
import ReviewForm, { FormData as ReviewFormData } from '@components/ReviewForm/ReviewForm'
import NewsletterForm from '@components/NewsletterForm/NewsletterForm'
import { useMutation } from 'react-query'
import { FormData as NewsletterFormData } from '@components/NewsletterForm/NewsletterForm'
import ReviewsList from '@components/ReviewsList/ReviewsList'

type ProductWithMarkdown = Omit<Product, 'longDescription'> & { longDescription: MarkdownParsed }

interface ProductPageProps {
  product: ProductWithMarkdown
  breadcrumbs: BreadrumbItem[]
}

const ProductPage = ({ product }: ProductPageProps) => {
  // TODO Add useProduct hook
  const { data: productData } = useGetProductReviewsQuery({
    variables: { slug: product.slug },
  })
  const [createReview, { loading: addingReview }] = useCreateProductReviewMutation({
    // Refetch generalnie jest bezpieczniejszy niz operowanie na cache'u
    // refetchQueries: [{ query: GetProductReviewsDocument, variables: { slug: product.slug } }],
    update(cache, result) {
      // If error while adding a review - errors are available under result.errors

      // TODO Handle error while optimistic update

      const reviewsQuery = cache.readQuery<GetProductReviewsQuery>({
        query: GetProductReviewsDocument,
        variables: { slug: product.slug },
      })

      if (!reviewsQuery?.product?.reviews || !result?.data?.review) {
        // If cache empty or
        // If mutation called without optimistic udpate
        return
      }

      const newReviewsQuery = {
        ...reviewsQuery,
        product: {
          ...reviewsQuery.product,
          reviews: [...reviewsQuery.product.reviews, result.data.review],
        },
      }

      cache.writeQuery({
        query: GetProductReviewsDocument,
        variables: { slug: product.slug },
        data: newReviewsQuery,
      })
    },
  })

  const addReview = (data: ReviewFormData) => {
    const dummyUser = {
      name: 'Dummy User',
      email: 'user@example.com',
    }
    createReview({
      variables: {
        review: {
          name: dummyUser.name,
          email: dummyUser.email,
          product: {
            connect: {
              slug: product.slug,
            },
          },
          ...data,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        review: {
          __typename: 'Review',
          id: Math.floor(-Math.random() * 100000 + 1).toString(),
          email: dummyUser.email,
          ...data,
        },
      },
    })
  }

  const { mutate, isLoading: subscribingNewsletter } = useAddToNewsletterMutation()

  const subscribeNewsletter = (data: NewsletterFormData) => {
    mutate(data)
  }

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
        <div className="grid gap-4 px-4 lg:px-8 mb-8">
          <Markdown>{product.longDescription}</Markdown>
          {!!productData?.product?.reviews?.length && (
            <ReviewsList reviews={productData.product.reviews} />
          )}
          <ReviewForm onSubmit={addReview} loading={addingReview} />
          <NewsletterForm onSubmit={subscribeNewsletter} loading={subscribingNewsletter} />
        </div>
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

const useAddToNewsletterMutation = () =>
  useMutation('subscribe-to-newsletter', async (data: NewsletterFormData) => {
    await fetch('http://localhost:3000/api/hello', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  })

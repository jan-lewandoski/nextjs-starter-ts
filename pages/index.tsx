import { gql } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

const Home = ({ data }: InferGetStaticPropsType<GetStaticProps>) => {
  // return (
  //   <Layout>
  //     <div>
  //       <h1>{t('home:hero.title')}</h1>
  //       <p className="text-lg">{t('home:hero.description')}</p>
  //     </div>
  //   </Layout>
  // )

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

interface GetAllProductsResponse {
  products: Product[]
}

interface Product {
  id: string
  slug: string
  name: string
  price: number
}

export const getStaticProps = async () => {
  const { data } = await apolloClient.query<GetAllProductsResponse>({
    query: gql`
      query GetAllProducts {
        products {
          id
          slug
          name
          price
        }
      }
    `,
  })

  return {
    props: {
      data,
    },
  }
}

export default Home

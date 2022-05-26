import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import React from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@components/Layout/Layout'
import { ProductsStateContextProvider } from 'context/ProductsContext'
import { CartStateContextProvider } from 'context/CartContext'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import theme from '../theme'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'
import { QueryClient, QueryClientProvider } from 'react-query'

NProgress.configure({
  showSpinner: false,
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const queryClient = new QueryClient()

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <ProductsStateContextProvider>
              <CartStateContextProvider>
                <Layout>
                  <DefaultSeo {...SEO} />
                  <Component {...pageProps} />
                </Layout>
              </CartStateContextProvider>
            </ProductsStateContextProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp)

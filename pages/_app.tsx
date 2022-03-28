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

import theme from '../theme'

NProgress.configure({
  showSpinner: false,
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  )
}

export default appWithTranslation(MyApp)

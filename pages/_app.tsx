import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import React from 'react'
import useProductsProvider, { ProductsContextType } from '@hooks/products/useProductsProvider'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false,
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export const ProductsContext = React.createContext<ProductsContextType | null>(null)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductsContext.Provider value={{ ...useProductsProvider() }}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ProductsContext.Provider>
  )
}

export default appWithTranslation(MyApp)

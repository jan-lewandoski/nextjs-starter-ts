import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import React from 'react'
import useProductsProvider, { ProductsContextType } from '@hooks/products/useProductsProvider'

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

import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { appWithTranslation } from 'next-i18next'
import Layout from '../components/Layout/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp)

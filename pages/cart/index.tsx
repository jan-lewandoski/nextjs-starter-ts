import Layout from '@components/Layout/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const CartPage = () => {
  return <Layout>CartPage</Layout>
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'navigation'])),
  },
})

export default CartPage

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const CartPage = () => {
  return <div>CartPage</div>
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'navigation'])),
  },
})

export default CartPage

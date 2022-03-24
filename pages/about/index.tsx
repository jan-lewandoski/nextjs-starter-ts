import Layout from '@components/Layout/Layout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <div>{t('about:title')}</div>
    </Layout>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'navigation', 'about'])),
  },
})

export default AboutPage

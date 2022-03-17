import WithLayout from '@hocs/WithLayout/WithLayout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const AboutPage = () => {
  const { t } = useTranslation()

  return <div>{t('about:title')}</div>
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'navigation', 'about'])),
  },
})

export default WithLayout(AboutPage)

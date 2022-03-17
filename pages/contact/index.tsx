import WithLayout from '@hocs/WithLayout/WithLayout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ContactPage = () => {
  const { t } = useTranslation()

  return <div>{t('contact:title')}</div>
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'navigation', 'contact'])),
  },
})

export default WithLayout(ContactPage)

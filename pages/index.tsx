import WithLayout from '@hocs/WithLayout/WithLayout'
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home: NextPage = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('home:hero.title')}</h1>
      <p className="text-lg">{t('home:hero.description')}</p>
    </div>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'navigation', 'home'])),
  },
})

export default WithLayout(Home)

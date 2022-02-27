import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home: NextPage = () => {
  const { t } = useTranslation()

  return (
    <div className="bg-black text-white">
      <h1>{t('common:yes')}</h1>
      <h1>{t('home:hero.title')}</h1>
      <p className="text-lg">{t('home:hero.description')}</p>
    </div>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'home'])),
  },
})

export default Home

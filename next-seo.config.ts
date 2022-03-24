import { APP_DOMAIN_URL } from '@constants/common'
import { NextSeoProps } from 'next-seo'

const title: string = 'Shop'
const description: string = 'This is a default description of the shop'

const nextSeoConfig: NextSeoProps = {
  title,
  description,
  openGraph: {
    title,
    description,
    site_name: title,
    url: APP_DOMAIN_URL,
  },
}

export default nextSeoConfig

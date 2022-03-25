import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Cart from './Cart'
import NavLink from './NavLink'

const tabs: string[] = ['/', '/products', '/about', '/contact']

const isTabActive = (currentPath: string, href: string) => {
  if (href === '/') return currentPath === '/'

  return currentPath.endsWith(href)
}

const Navbar = () => {
  const { t } = useTranslation('navigation')

  const { asPath } = useRouter()

  return (
    <nav className="p-4 h-16 align-middle w-full border-b-2 flex justify-between fixed z-50 top-0 left-0 bg-white">
      <ul className="w-100 flex justify-end align-middle self-center">
        {tabs.map((href) => (
          <NavLink key={href} href={href} name={t(href)} active={isTabActive(asPath, href)} />
        ))}
      </ul>
      <Cart />
    </nav>
  )
}
export default Navbar

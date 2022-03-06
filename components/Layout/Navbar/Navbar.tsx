import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
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
    <nav className="p-4 w-100 border-b-2">
      <ul className="w-100 flex justify-end align-middle">
        {tabs.map((href) => (
          <NavLink key={href} href={href} name={t(href)} active={isTabActive(asPath, href)} />
        ))}
      </ul>
    </nav>
  )
}
export default Navbar

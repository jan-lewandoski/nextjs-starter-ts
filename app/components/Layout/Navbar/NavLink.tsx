import Link from 'next/link'

interface NavLinkProps {
  name: string
  href: string
  active: boolean
}

const NavLink = ({ name, href, active }: NavLinkProps) => {
  return (
    <li
      key={href}
      className={`whitespace-nowrap h-fit mx-4 transition ease-in-out delay-150 ${
        active ? 'underline underline-offset-4' : 'no-underline'
      }`}
    >
      <Link href={href}>{name}</Link>
    </li>
  )
}

export default NavLink

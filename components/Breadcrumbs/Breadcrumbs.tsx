import Link from 'next/link'
import React from 'react'

export interface BreadrumbItem {
  text: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadrumbItem[]
}

const getBreadcrumbItem = (item: BreadrumbItem): JSX.Element => {
  if (item.href) {
    return (
      <span className="flex">
        <Link href={item.href}>{item.text}</Link>
      </span>
    )
  }

  return <div className="text-gray-500">{item.text}</div>
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="bg-gray-100 p-3 font-sans w-100">
      <ol className="flex">
        {items.map((item, idx) => (
          <>
            {idx !== 0 && (
              <span className={`mx-3 ${item.href ? 'font-bold' : 'text-gray-500'}`}>/</span>
            )}
            <li key={item.href}>{getBreadcrumbItem(item)}</li>
          </>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs

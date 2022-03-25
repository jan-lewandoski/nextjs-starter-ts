import Link from 'next/link'
import ShoppingBag from '../../../../public/images/icons/shopping-bag.svg'

const Cart = () => {
  return (
    <Link href="/cart">
      <a aria-label="Go to shopping cart">
        <ShoppingBag width={24} height={24} stroke="black" />
      </a>
    </Link>
  )
}

export default Cart
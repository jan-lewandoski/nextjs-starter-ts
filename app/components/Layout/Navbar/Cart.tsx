import useCart from '@hooks/cart/useCart'
import Link from 'next/link'
import ShoppingBag from '../../../../public/images/icons/shopping-bag.svg'

const Cart = () => {
  const { cartItems, getCartSize } = useCart()
  return (
    <Link href="/cart">
      <a className="relative d-flex align-middle justify-center" aria-label="Go to shopping cart">
        {cartItems.length > 0 && (
          <div className=" absolute -bottom-3 -right-3 w-6 h-6 font-bold text-sm rounded-full text-white bg-indigo-800 flex items-center justify-center font-mono">
            {getCartSize()}
          </div>
        )}
        <ShoppingBag width={32} height={32} stroke="black" />
      </a>
    </Link>
  )
}

export default Cart

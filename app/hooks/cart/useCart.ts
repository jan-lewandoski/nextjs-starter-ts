import { Product } from '@customTypes/products/Product'
import { CartStateContext } from 'context/CartContext'
import { useContext } from 'react'

const useCart = () => {
  const context = useContext(CartStateContext)

  if (!context) {
    throw new Error('You forgot to use CartStateContext!')
  }

  const { cartItems, setCartItems } = context

  const addToCart = (product: Product) => {
    setCartItems((cartItems) => {
      const existsInCart = cartItems.some(({ id }) => id === product.id)

      if (!existsInCart) {
        return [...cartItems, { ...product, amount: 1 }]
      }

      return cartItems.map((item) =>
        item.id === product.id ? { ...item, amount: item.amount + 1 } : item,
      )
    })
  }

  const removeFromCart = (removedProduct: Product) => {
    setCartItems((cartItems) => {
      return cartItems.map((item) =>
        item.id === removedProduct.id ? { ...item, amount: item.amount - 1 } : item,
      )
    })
  }

  const getCartSize = (): number => {
    return cartItems.reduce((a, b) => a + b.amount, 0)
  }

  return { cartItems, addToCart, removeFromCart, getCartSize }
}

export default useCart

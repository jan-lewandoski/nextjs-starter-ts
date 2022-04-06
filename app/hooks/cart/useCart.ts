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
    setAmount(removedProduct, 0)
  }

  const getCartSize = () => {
    return cartItems.reduce((acc, cur) => acc + cur.amount, 0)
  }

  const setAmount = (product: Product, amount: number) => {
    if (amount === 0) {
      setCartItems((cartItems) => {
        return cartItems.filter((item) => item.id !== product.id)
      })
    } else {
      return cartItems.map((item) => (item.id === product.id ? { ...item, amount } : item))
    }
  }

  const getTotalPrice = () => {
    return cartItems.map((item) => item.price * item.amount).reduce((acc, cur) => acc + cur, 0)
  }

  return { cartItems, addToCart, removeFromCart, getCartSize, setAmount, getTotalPrice }
}

export default useCart

import { Product } from '@customTypes/products/Product'
import { CartStateContext } from 'context/CartContext'
import { useContext } from 'react'

const useCart = () => {
  const context = useContext(CartStateContext)

  if (!context) {
    throw new Error('You forgot to use CartStateContext!')
  }

  const { cartProducts, setCartProducts } = context

  const addToCart = (product: Product) => {
    setCartProducts((products) => [...products, product])
  }

  const removeFromCart = (removedProduct: Product) => {
    const filteredProducts = cartProducts.filter(({ id }) => id !== removedProduct.id)
    setCartProducts(filteredProducts)
  }

  return { cartProducts, addToCart, removeFromCart }
}

export default useCart

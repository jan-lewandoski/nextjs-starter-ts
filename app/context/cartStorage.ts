import { CartItem } from '@customTypes/cart/CartItem'

export const getCartItemsFromStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem('MY_SHOP_SHOPPING_CART')

  if (!itemsFromLocalStorage) {
    return []
  }

  try {
    const items = JSON.parse(itemsFromLocalStorage)
    return items
  } catch (error) {
    console.error(error)
    return []
  }
}

export const setCartItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem('MY_SHOP_SHOPPING_CART', JSON.stringify(cartItems))
}

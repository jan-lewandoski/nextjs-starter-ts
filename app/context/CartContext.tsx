import { CartItem } from '@customTypes/cart/CartItem'
import { StateSetter } from '@customTypes/common'
import React, { ReactNode, useEffect, useState } from 'react'
import { getCartItemsFromStorage, setCartItemsInStorage } from './cartStorage'

export interface CartState {
  cartItems: CartItem[]

  setCartItems: StateSetter<CartItem[]>
}

export const CartStateContext = React.createContext<CartState | null>(null)

export const CartStateContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    setCartItems(getCartItemsFromStorage())
  }, [])

  useEffect(() => {
    setCartItemsInStorage(cartItems)
  }, [cartItems])

  return (
    <CartStateContext.Provider
      value={{
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartStateContext.Provider>
  )
}

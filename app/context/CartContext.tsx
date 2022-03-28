import { StateSetter } from '@customTypes/common'
import { Product } from '@customTypes/products/Product'
import React, { ReactNode, useState } from 'react'

interface CartItem extends Product {
  amount: number
}

export interface CartState {
  cartItems: CartItem[]

  setCartItems: StateSetter<CartItem[]>
}

export const CartStateContext = React.createContext<CartState | null>(null)

export const CartStateContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

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

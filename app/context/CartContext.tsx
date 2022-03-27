import { StateSetter } from '@customTypes/common'
import { Product } from '@customTypes/products/Product'
import React, { ReactNode, useState } from 'react'

export interface CartState {
  cartProducts: Product[]

  setCartProducts: StateSetter<Product[]>
}

export const CartStateContext = React.createContext<CartState | null>(null)

export const CartStateContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<Product[]>([])

  return (
    <CartStateContext.Provider
      value={{
        cartProducts,
        setCartProducts,
      }}
    >
      {children}
    </CartStateContext.Provider>
  )
}

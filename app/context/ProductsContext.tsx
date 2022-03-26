import { StateSetter } from '@customTypes/common'
import { Pagination } from '@customTypes/products/Pagination'
import { Product } from '@customTypes/products/Product'
import React, { ReactNode, useState } from 'react'

export interface ProductsState {
  products: Product[]
  loading: boolean
  pagination: Pagination

  setProducts: StateSetter<Product[]>
  setLoading: StateSetter<boolean>
  setPagination: StateSetter<Pagination>
}

export const ProductsStateContext = React.createContext<ProductsState | null>(null)

export const ProductsStateContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<Pagination>({ take: 12, offset: 0 })

  return (
    <ProductsStateContext.Provider
      value={{
        products,
        loading,
        pagination,
        setProducts,
        setLoading,
        setPagination,
      }}
    >
      {children}
    </ProductsStateContext.Provider>
  )
}

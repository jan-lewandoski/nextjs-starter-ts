import { INITIAL_PAGINATION } from '@constants/products'
import { Pagination } from '@customTypes/products/Pagination'
import { Product } from '@customTypes/products/Product'
import { useState } from 'react'

export type ProductsContextType = ReturnType<typeof useProductsProvider>

const useProductsProvider = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<Pagination>(INITIAL_PAGINATION)

  return { products, setProducts, loading, setLoading, pagination, setPagination }
}

export default useProductsProvider

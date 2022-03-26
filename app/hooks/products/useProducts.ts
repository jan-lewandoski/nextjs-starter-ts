import api from '@api/api'
import { Pagination } from '@customTypes/products/Pagination'
import { Product } from '@customTypes/products/Product'
import { ProductsStateContext } from 'context/ProductsContext'
import { useContext } from 'react'

const LOAD_MORE_PRODUCTS_INCREMENT = 12

const useProducts = () => {
  const context = useContext(ProductsStateContext)

  if (!context) {
    throw new Error('Components should be wrapped in ProductsStateContextProvider')
  }

  const { products, setProducts, loading, setLoading, pagination, setPagination } = context

  const loadMoreProducts = async () => {
    setLoading(true)
    const newPagination: Pagination = {
      ...pagination,
      offset: pagination.offset + LOAD_MORE_PRODUCTS_INCREMENT,
    }
    const newProducts: Product[] = await api.getProducts(newPagination)
    setProducts([...products, ...newProducts])
    setPagination(newPagination)
    setLoading(false)
  }

  return { products, setProducts, loading, setLoading, pagination, setPagination, loadMoreProducts }
}

export default useProducts

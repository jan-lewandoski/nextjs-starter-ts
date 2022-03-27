import api from '@api/api'
import { Pagination } from '@customTypes/products/Pagination'
import { Product } from '@customTypes/products/Product'
import { ProductsStateContext } from 'context/ProductsContext'
import { useContext } from 'react'

const LOAD_MORE_PRODUCTS_INCREMENT = 12

const useProducts = () => {
  const context = useContext(ProductsStateContext)

  if (!context) {
    throw new Error('You forgot to use ProductsStateContextProvider!')
  }

  const { products, loading, pagination, setProducts, setLoading, setPagination } = context

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

  const changeProducts = (newProducts: Product[]) => {
    setProducts(newProducts)
  }

  return { products, loading, pagination, loadMoreProducts, changeProducts }
}

export default useProducts

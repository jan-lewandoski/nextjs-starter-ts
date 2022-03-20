import api from '@api/api'
import { OFFSET_INCREMENT } from '@constants/products'
import { Pagination } from '@customTypes/products/Pagination'
import { Product } from '@customTypes/products/Product'
import { useContext } from 'react'
import { ProductsContext } from '../../../pages/_app'

const useProducts = () => {
  const context = useContext(ProductsContext)

  if (!context) {
    throw new Error('Products context is null')
  }

  const { products, setProducts, loading, setLoading, pagination, setPagination } = context

  const loadMoreProducts = async () => {
    setLoading(true)
    const newPagination: Pagination = {
      ...pagination,
      offset: pagination.offset + OFFSET_INCREMENT,
    }
    const newProducts: Product[] = await api.getProducts(newPagination)
    setProducts([...products, ...newProducts])
    setPagination(newPagination)
    setLoading(false)
  }

  return { products, setProducts, loading, setLoading, pagination, setPagination, loadMoreProducts }
}

export default useProducts

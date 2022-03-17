import shallow from 'zustand/shallow'
import useProductsStore, { ProductsState } from '../../store/products/useProductsStore'

const useProducts = () => {
  return useProductsStore<ProductsState>(
    ({ products, loading, pagination, loadMoreProducts, setProducts }: ProductsState) => ({
      products,
      loading,
      pagination,
      loadMoreProducts,
      setProducts,
    }),
    shallow,
  )
}

export default useProducts

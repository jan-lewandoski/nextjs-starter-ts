import create from 'zustand'
import api from '../../api/api'
import { INITIAL_PAGINATION, OFFSET_INCREMENT } from '../../constants/products.constants'
import { Pagination } from '../../types/products/Pagination'
import { Product } from '../../types/products/Product'

export interface ProductsState {
  products: Product[]
  pagination: Pagination
  loading: boolean
  loadMoreProducts: () => Promise<void>
  //eslint-disable-next-line
  setProducts: (products: Product[]) => void
}

type ProductsStateValues = Omit<ProductsState, 'loadMoreProducts' | 'setProducts'>

const DEFAULT_PRODUCTS_STATE: ProductsStateValues = {
  products: [],
  pagination: INITIAL_PAGINATION,
  loading: false,
}

const useProductsStore = create<ProductsState>((set, get) => ({
  products: DEFAULT_PRODUCTS_STATE.products,
  loading: DEFAULT_PRODUCTS_STATE.loading,
  pagination: DEFAULT_PRODUCTS_STATE.pagination,
  setProducts: (products: Product[]) => {
    set((state) => ({ ...state, products }))
  },
  loadMoreProducts: async () => {
    set((state) => ({ ...state, loading: true }))
    const pagination = get().pagination
    const newPagination = { ...pagination, offset: pagination.offset + OFFSET_INCREMENT }
    const newProducts: Product[] = await api.getProducts(newPagination)
    set((state) => ({
      ...state,
      products: [...state.products, ...newProducts],
      pagination: newPagination,
      loading: false,
    }))
  },
}))

export default useProductsStore

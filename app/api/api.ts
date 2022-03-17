import { Pagination } from '../types/products/Pagination'
import { Product } from '../types/products/Product'

const api = {
  getProducts: async (pagination: Pagination): Promise<Product[]> => {
    const res = await fetch(
      `https://naszsklep-api.vercel.app/api/products?take=${pagination.take}&offset=${pagination.offset}`,
    )
    const data = await res.json()
    return data
  },
  getProduct: async (productId: string): Promise<Product> => {
    const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${productId}`)
    const data = await res.json()
    return data
  },
}

export default api

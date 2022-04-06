import { Product } from '@customTypes/products/Product'

export interface CartItem extends Product {
  amount: number
}

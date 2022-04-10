import { Category, Image } from '@customTypes/common'

export interface Product {
  id: string
  name: string
  description: string
  slug: string
  price: number
  images: Image[]
  categories: Category[]
}

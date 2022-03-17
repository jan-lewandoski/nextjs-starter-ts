import Rating from '@components/Rating/Rating'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../../types/products/Product'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <a className="rounded shadow-md p-4 grid gap-2 h-full">
        <Image
          className="mb-4"
          width="16"
          height="9"
          layout="responsive"
          objectFit="contain"
          src={product.image}
          alt={`${product.title} image`}
        />
        <div>
          <p className="font-bold">{product.title}</p>
          <p>${product.price}</p>
        </div>
        <Rating rating={product.rating} />
      </a>
    </Link>
  )
}

export default ProductCard

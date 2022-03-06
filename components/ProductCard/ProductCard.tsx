import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../../types/products/Product'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <a className="rounded shadow-md p-4 flex flex-col h-full">
        <span className="mb-4">
          <Image
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            src={product.image}
            alt={`${product.title} image`}
          />
        </span>
        <p className="font-bold">{product.title}</p>
        <p>${product.price}</p>
      </a>
    </Link>
  )
}

export default ProductCard

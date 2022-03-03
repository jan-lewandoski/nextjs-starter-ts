import Image from 'next/image'
import { Product } from '../../types/products/Product'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="rounded shadow-md p-4 flex flex-col">
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
    </div>
  )
}

export default ProductCard

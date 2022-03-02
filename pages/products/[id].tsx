import { useRouter } from 'next/router'

const ProductPage = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Product: {id}</p>
}

export default ProductPage

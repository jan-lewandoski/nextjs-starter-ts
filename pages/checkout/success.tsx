import { useRouter } from 'next/router'

const CheckoutSuccessPage = () => {
  const { query } = useRouter()

  return <div>Success! Checkout ID: {query.session_id}</div>
}

export default CheckoutSuccessPage

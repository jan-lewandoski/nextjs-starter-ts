import { SimpleGrid, VStack, Text, Box, Button } from '@chakra-ui/react'
import CartItem from '@components/CartItem/CartItem'
import useCart from '@hooks/cart/useCart'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { loadStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const CartPage = () => {
  const { cartItems, getTotalPrice, removeFromCart, setAmount } = useCart()

  const handleCheckout = async () => {
    const stripe = await stripePromise

    if (!stripe) {
      throw new Error('Something went wrong...')
    }

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        cartItems.map((item) => ({
          slug: item.slug,
          amount: item.amount,
        })),
      ),
    })

    const { session }: { session: Stripe.Response<Stripe.Checkout.Session> } = await res.json()

    await stripe.redirectToCheckout({ sessionId: session.id })
  }

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4} p={4}>
      <VStack spacing={4} align={'flex-start'}>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onAmountChange={setAmount}
            onRemove={removeFromCart}
          />
        ))}
      </VStack>
      <Box
        border={'1px'}
        borderColor={'gray.100'}
        borderRadius={'md'}
        p={4}
        display={'flex'}
        h={'fit-content'}
        alignSelf={'end'}
      >
        <Text
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          flex={1}
        >
          Total amount
        </Text>
        <Text fontWeight="bold">{getTotalPrice()} PLN</Text>
      </Box>
      {cartItems.length > 0 && (
        <Button colorScheme={'blue'} gridColumn={2} onClick={handleCheckout}>
          Go to checkout
        </Button>
      )}
    </SimpleGrid>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'navigation'])),
  },
})

export default CartPage

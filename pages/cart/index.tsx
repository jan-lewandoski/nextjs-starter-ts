import { SimpleGrid, VStack, Text, Box } from '@chakra-ui/react'
import CartItem from '@components/CartItem/CartItem'
import useCart from '@hooks/cart/useCart'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const CartPage = () => {
  const { cartItems, getTotalPrice, removeFromCart, setAmount } = useCart()

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
        <Text fontWeight="bold">${getTotalPrice()}</Text>
      </Box>
    </SimpleGrid>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'navigation'])),
  },
})

export default CartPage

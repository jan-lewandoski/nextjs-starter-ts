import {
  HStack,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  IconButton,
} from '@chakra-ui/react'

import TrashIcon from '../../../public/images/icons/trash-icon.svg'

import { CartItem as CartItemType } from '@customTypes/cart/CartItem'

import Image from 'next/image'

interface CartItemProps {
  item: CartItemType

  //   eslint-disable-next-line
  onAmountChange: (item: CartItemType, amount: number) => void
  //   eslint-disable-next-line
  onRemove: (item: CartItemType) => void
}

const CartItem = ({ item, onAmountChange, onRemove }: CartItemProps) => {
  return (
    <HStack spacing={4} p={4} w={'full'} borderBottom={'1px'} borderColor={'gray.100'}>
      <Image
        width={64}
        height={64}
        objectFit="contain"
        src={item.images?.length ? item.images[0].url : ''}
        alt={`${item.name} image`}
      />
      <VStack spacing={2} align={'self-start'} flexGrow={1}>
        <Text fontSize={'md'} fontWeight="bold">
          {item.name}
        </Text>
        <Text
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          {item.categories?.length ? item.categories[0].name : ''}
        </Text>
      </VStack>
      <Text color="gray.800" fontWeight="semibold" letterSpacing="wide" fontSize="sm">
        {item.price / 100} PLN
      </Text>
      <HStack spacing={2} display={'flex'} alignItems={'center'}>
        <Text color="gray.500" fontSize="xs">
          Quantity:
        </Text>
        <NumberInput
          defaultValue={item.amount}
          min={0}
          size={'xs'}
          w={16}
          onChange={(val) => onAmountChange(item, parseInt(val))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
      <IconButton
        aria-label="Remove from cart"
        colorScheme={'red'}
        size={'sm'}
        icon={<TrashIcon width={16} height={16} />}
        onClick={() => onRemove(item)}
      />
    </HStack>
  )
}

export default CartItem

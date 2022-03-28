import { Rating } from '@customTypes/products/Rating'

import StarIcon from '../../../public/images/icons/star-icon.svg'

import { HStack } from '@chakra-ui/react'
import { useMemo } from 'react'
export const MAX_STARS_LENGTH = 5

interface RatingProps {
  rating: Rating
  size?: 'sm' | 'md' | 'lg'
}

const Rating = ({ rating, size = 'md' }: RatingProps) => {
  const stars = [...Array(Math.floor(rating.rate)).keys()]

  const iconSize = useMemo(() => {
    switch (size) {
      case 'sm':
        return 12
      case 'md':
        return 24
      case 'lg':
        return 32
      default:
        throw new Error('Invalid size')
    }
  }, [size])

  if (!stars?.length) {
    return <></>
  }
  return (
    <HStack spacing={1}>
      {stars.map(
        (star) =>
          star < MAX_STARS_LENGTH && (
            <StarIcon
              key={star}
              data-testid="star--icon"
              width={iconSize}
              height={iconSize}
              fill="#d1b610"
            />
          ),
      )}
    </HStack>
  )
}

export default Rating

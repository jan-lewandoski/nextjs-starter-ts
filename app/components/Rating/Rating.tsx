import { Rating } from '@customTypes/products/Rating'
import Image from 'next/image'

import StarIcon from '../../../public/images/icons/star-icon.svg'

export const MAX_STARS_LENGTH = 5

interface RatingProps {
  rating: Rating
}

const Rating = ({ rating }: RatingProps) => {
  const stars = [...Array(Math.floor(rating.rate)).keys()]

  if (!stars?.length) {
    return <></>
  }

  return (
    <div className="flex">
      {stars.map(
        (star) =>
          star < MAX_STARS_LENGTH && (
            <Image
              data-testid="star--icon"
              key={star}
              src={StarIcon}
              width="16"
              height="16"
              alt="Star"
            />
          ),
      )}
    </div>
  )
}

export default Rating

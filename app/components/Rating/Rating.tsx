import { Rating } from '@customTypes/products/Rating'

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
            <StarIcon key={star} data-testid="star--icon" width={24} height={24} fill="#d1b610" />
          ),
      )}
    </div>
  )
}

export default Rating

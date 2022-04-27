import { Heading, Text, SimpleGrid, Flex, Avatar } from '@chakra-ui/react'
import { ReviewContentFragment } from 'graphql/generated/graphql'

import StarRating from 'react-svg-star-rating/dist'

interface ReviewProps {
  review: ReviewContentFragment
}

const Review = ({ review }: ReviewProps) => {
  return (
    <SimpleGrid gap={2} p={4}>
      <Flex alignItems={'center'}>
        <Avatar mr={2} size={'xs'} name={review.email} />
        <Text fontSize={'xs'}>{review.email}</Text>
      </Flex>
      <Flex alignItems={'center'}>
        <StarRating
          containerClassName="flex"
          size={16}
          initialRating={review.rating || 0}
          isReadOnly={true}
        />
        <Heading ml={2} size={'sm'}>
          {review.headline}
        </Heading>
      </Flex>
      <Text fontSize={'md'}>{review.content}</Text>
    </SimpleGrid>
  )
}

export default Review

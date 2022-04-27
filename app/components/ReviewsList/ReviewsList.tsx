import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react'
import Review from '@components/Review/Review'
import { ReviewContentFragment } from 'graphql/generated/graphql'

interface ReviewsListProps {
  reviews: ReviewContentFragment[]
}

const ReviewsList = ({ reviews }: ReviewsListProps) => {
  return (
    <Accordion allowToggle borderColor={'transparent'}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Text fontWeight={'bold'} fontSize={'md'}>
                Reviews ({reviews.length})
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <List spacing={2}>
            {reviews.map((review, idx) => (
              <ListItem key={review.id}>
                <Review review={review} />
                {idx !== reviews.length - 1 && <Divider my={2} />}
              </ListItem>
            ))}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default ReviewsList

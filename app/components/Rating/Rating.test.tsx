import { render, screen } from '@testing-library/react'
import Rating, { MAX_STARS_LENGTH } from './Rating'

const testData = [
  {
    rate: 0,
    expectedStarsCount: 0,
  },
  {
    rate: 0.21,
    expectedStarsCount: 0,
  },
  {
    rate: 1,
    expectedStarsCount: 1,
  },
  {
    rate: 1.99,
    expectedStarsCount: 1,
  },
  {
    rate: 2,
    expectedStarsCount: 2,
  },
  {
    rate: 2.1,
    expectedStarsCount: 2,
  },
  {
    rate: 2.1,
    expectedStarsCount: 2,
  },
  {
    rate: 3,
    expectedStarsCount: 3,
  },
  {
    rate: 4,
    expectedStarsCount: 4,
  },
  {
    rate: 5,
    expectedStarsCount: 5,
  },
  {
    rate: 5.2,
    expectedStarsCount: 5,
  },
  {
    rate: MAX_STARS_LENGTH,
    expectedStarsCount: MAX_STARS_LENGTH,
  },
  {
    rate: MAX_STARS_LENGTH + 0.01,
    expectedStarsCount: MAX_STARS_LENGTH,
  },
  {
    rate: MAX_STARS_LENGTH + 100,
    expectedStarsCount: MAX_STARS_LENGTH,
  },
]

describe('RatingComponent', () => {
  describe('Should render a correct number of stars based on rating', () => {
    testData.map(({ rate, expectedStarsCount }) => {
      return test(`Should render ${expectedStarsCount} stars for rating ${rate}`, () => {
        render(<Rating rating={{ rate, count: 0 }} />)

        expect(screen.queryAllByTestId('star--icon')).toHaveLength(expectedStarsCount)
      })
    })
  })
})

import ContactForm from '@components/ContactForm/ContactForm'
import { useCreateProductReviewMutation } from 'graphql/generated/graphql'

const ContactPage = () => {
  const addReview = () => {
    createReview({
      variables: {
        review: {
          headline: 'Taki sobie produkt!',
          name: 'Jan',
          email: 'jan@gm.com',
          content: 'Super kiepski fajny produkt',
          rating: 3,
        },
      },
    })
  }

  const [createReview, { data }] = useCreateProductReviewMutation()

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 m-auto">
      <ContactForm />
      <button onClick={addReview}>Add review</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export const getStaticProps = async () => ({
  props: {},
})

export default ContactPage

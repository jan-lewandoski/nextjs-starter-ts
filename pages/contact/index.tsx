import ContactForm from '@components/ContactForm/ContactForm'

const ContactPage = () => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 m-auto">
      <ContactForm />
    </div>
  )
}

export const getStaticProps = async () => ({
  props: {},
})

export default ContactPage

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormInput from '@components/FormInput/FormInput'

type FormData = yup.InferType<typeof FormDataSchema>

const FormDataSchema = yup
  .object({
    email: yup.string().email('Please provide a valid email').required('Please provide your email'),
    message: yup.string().required('Please tell us what you need'),
  })
  .required()

const ContactForm = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({ resolver: yupResolver(FormDataSchema) })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <h2 className="text-xl font-bold my-2">Contact us</h2>

        <FormInput<FormData>
          label="Email"
          id="email"
          type="email"
          placeholder="user@example.com"
          register={register}
          errors={errors}
        />

        <FormInput<FormData>
          label="Message"
          id="message"
          type="text"
          register={register}
          errors={errors}
        />

        <button
          type="submit"
          onClick={onSubmit}
          className="text-sm py-3 px-6 rounded-xl shadow-lg bg-primary-500 text-white font-bold"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default ContactForm

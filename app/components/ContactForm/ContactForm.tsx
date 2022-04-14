import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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

        <div className="w-full">
          <label className="uppercase tracking-wide text-gray-700 text-xs font-bold">
            Email
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              placeholder="user@example.com"
              {...register('email')}
            />
          </label>
          {errors.email && (
            <p className="text-red-500 my-2 text-xs italic">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full">
          <label className="uppercase tracking-wide text-gray-700 text-xs font-bold">
            Message
            <textarea
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="message"
              {...register('message')}
            />
          </label>
          {errors.message && (
            <p className="text-red-500 my-2 text-xs italic">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          onClick={onSubmit}
          className="text-sm py-3 px-6 rounded-xl shadow-lg bg-blue-500 text-white font-bold"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default ContactForm

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormInput from '@components/FormInput/FormInput'
import { Button } from '@chakra-ui/react'

interface NewsletterFormProps {
  loading: boolean
  // eslint-disable-next-line
  onSubmit: (data: FormData) => void
}

export type FormData = yup.InferType<typeof FormDataSchema>

const FormDataSchema = yup
  .object({
    email: yup.string().email('Please provide a valid email').required('Please provide your email'),
  })
  .required()

const NewsletterForm = ({ loading, onSubmit }: NewsletterFormProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({ resolver: yupResolver(FormDataSchema) })

  const submitHandler = handleSubmit((data) => {
    onSubmit(data)
  })

  return (
    <form onSubmit={submitHandler}>
      <div className="grid gap-4">
        <h2 className="text-xl font-bold my-2">Sign up to our Newsletter</h2>

        <FormInput<FormData>
          label="Email"
          id="email"
          type="email"
          register={register}
          errors={errors}
        />

        <Button
          isLoading={loading}
          loadingText="Submitting..."
          onClick={submitHandler}
          colorScheme="blue"
        >
          Sign up
        </Button>
      </div>
    </form>
  )
}

export default NewsletterForm

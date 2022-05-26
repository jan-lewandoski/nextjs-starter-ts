import { Button, Flex } from '@chakra-ui/react'
import FormInput from '@components/FormInput/FormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type FormData = yup.InferType<typeof SignupFormSchema>

export const SignupFormSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(SignupFormSchema) })

  const onSubmit = handleSubmit(async (data) => {
    await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  })

  return (
    <Flex w={'100%'}>
      <form
        onSubmit={onSubmit}
        className="max-w-3xl  mt-8 mx-auto border border-gray-200 rounded p-4 "
      >
        <div className="grid gap-4">
          <h2 className="text-xl font-bold my-2">Sign up</h2>

          <FormInput<FormData>
            label="Email"
            id="email"
            type="email"
            register={register}
            errors={errors}
          />

          <FormInput<FormData>
            label="Password"
            id="password"
            type="text"
            register={register}
            errors={errors}
          />

          <Button type="submit" variant={'outline'}>
            Sign up
          </Button>
        </div>
      </form>
    </Flex>
  )
}

export default SignupPage

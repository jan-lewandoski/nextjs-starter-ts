import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import FormInput from '@components/FormInput/FormInput'
import StarRating from 'react-svg-star-rating'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'

export interface ReviewFormProps {
  loading: boolean
  // eslint-disable-next-line
  onSubmit: (data: FormData) => void
}

export type FormData = yup.InferType<typeof FormDataSchema>

const FormDataSchema = yup
  .object({
    rating: yup.number().required('Rating cannot be empty'),
    headline: yup
      .string()
      .required('Title cannot be empty')
      .max(50, 'Title must be shorter than 50 characters'),
    content: yup
      .string()
      .required('Description cannot be empty')
      .max(500, 'Description must be shorter than 500 characters'),
  })
  .required()

const ReviewForm = ({ loading, onSubmit }: ReviewFormProps) => {
  const {
    formState: { errors, isSubmitSuccessful },
    setValue,
    register,
    handleSubmit,
  } = useForm<FormData>({ resolver: yupResolver(FormDataSchema) })

  const submitHandler = handleSubmit((data) => {
    onSubmit(data)
  })

  if (!loading && isSubmitSuccessful) {
    return <FormSubmittedAlert />
  }

  return (
    <form
      onSubmit={submitHandler}
      className="max-w-3xl border border-gray-200 rounded p-4 m-4 md:m-8"
    >
      <div className="grid gap-4">
        <h2 className="text-xl font-bold my-2">Leave a review</h2>

        {/* TODO Move to separate component */}
        <FormControl isInvalid={errors && !!errors['rating']}>
          <FormLabel>Rating</FormLabel>
          <StarRating
            containerClassName="flex"
            size={32}
            handleOnClick={(value) => setValue('rating', value)}
          />

          <ErrorMessage
            errors={errors}
            name={'rating'}
            render={({ message }) => <FormErrorMessage>{message}</FormErrorMessage>}
          />
        </FormControl>

        <FormInput<FormData>
          label="Title"
          id="headline"
          type="text"
          register={register}
          errors={errors}
        />

        <FormInput<FormData>
          label="Description"
          id="content"
          type="text"
          inputType="textarea"
          register={register}
          errors={errors}
        />

        <Button
          isLoading={loading}
          loadingText="Submitting..."
          onClick={submitHandler}
          colorScheme="blue"
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

export default ReviewForm

const FormSubmittedAlert = () => {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Your review has been submitted!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Thanks for submitting your review. Other customers will find it very helpful.
      </AlertDescription>
    </Alert>
  )
}

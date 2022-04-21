import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/react'
import { DeepMap, FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useMemo } from 'react'

type InputType = {
  text: number
  email: string
  date: string
  checkbox: string
}

export interface FormInputProps<TFormData extends FieldValues> {
  register?: UseFormRegister<TFormData>
  id: Path<TFormData>
  type: Path<InputType>
  placeholder?: string
  label: string
  inputType?: 'input' | 'textarea'
  errors?: Partial<DeepMap<TFormData, FieldError>>
}

const FormInput = <TFormData extends Record<string, unknown>>({
  register,
  id,
  type,
  placeholder,
  label,
  errors,
  inputType = 'input',
}: FormInputProps<TFormData>) => {
  const isInvalid = useMemo(() => {
    return errors && !!errors[id]?.ref
  }, [errors])

  if (!register) return null

  const props = { id, type, placeholder, ...register(id) }

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {inputType === 'input' && <Input {...props} />}
      {inputType === 'textarea' && <Textarea {...props} />}
      {isInvalid && (
        <ErrorMessage
          errors={errors}
          name={id as any}
          render={({ message }) => <FormErrorMessage>{message}</FormErrorMessage>}
        />
      )}
    </FormControl>
  )
}

export default FormInput

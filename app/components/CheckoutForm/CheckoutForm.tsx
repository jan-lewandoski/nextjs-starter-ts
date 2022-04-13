import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type FormData = yup.InferType<typeof FormDataSchema>

const FormDataSchema = yup
  .object({
    email: yup.string().email().required(),
    ccName: yup.string().required(),
    ccExpirationDate: yup.string().required(),
    ccCvc: yup.string().length(3).required(),
    ccNumber: yup.string().required(),
    company: yup.string().required(),
    address: yup.string().required(),
    apartment: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    postalCode: yup.string().required(),
    isBillingSameAsShipping: yup.boolean().required(),
  })
  .required()

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(FormDataSchema) })
  const onSubmit = handleSubmit((data) => console.log(data))
  return (
    <form onSubmit={onSubmit} className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <h2 className="text-xl font-bold my-4">Contact information</h2>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="email"
            {...register('email')}
            type="email"
            placeholder="your@email.com"
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <h2 className="text-xl font-bold my-4">Payment details</h2>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="ccName"
          >
            Name on card
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="ccName"
            {...register('ccName')}
            type="text"
            placeholder="Your Name"
          />
          <p className="text-red-500 text-xs italic">{errors.ccName?.message}</p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="ccExpirationDate"
          >
            Expiration Date (MM/YY)
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="ccExpirationDate"
            {...register('ccExpirationDate')}
            type="text"
            placeholder="MM/YY"
          />
          <p className="text-red-500 text-xs italic">{errors.ccExpirationDate?.message}</p>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="ccCvc"
          >
            CVC
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="ccCvc"
            {...register('ccCvc')}
            type="text"
            placeholder="CVC"
          />
          <p className="text-red-500 text-xs italic">{errors.ccCvc?.message}</p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="ccNumber"
          >
            Card number
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="ccNumber"
            {...register('ccNumber')}
            type="text"
            placeholder="Card number"
          />
          <p className="text-red-500 text-xs italic">{errors.ccNumber?.message}</p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <h2 className="text-xl font-bold my-4">Shopping address</h2>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="company"
          >
            Company
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="company"
            {...register('company')}
            type="text"
            placeholder="Company Name"
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="address"
            {...register('address')}
            type="text"
            placeholder="Address"
          />
          <p className="text-red-500 text-xs italic">{errors.address?.message}</p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="apartment"
          >
            Apartment, suite, etc.
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="apartment"
            {...register('apartment')}
            type="text"
            placeholder="Apartment, suite, etc."
          />
          <p className="text-red-500 text-xs italic">{errors.apartment?.message}</p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="city"
          >
            City
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="city"
            {...register('city')}
            type="text"
            placeholder="Albuquerque"
          />
          <p className="text-red-500 text-xs italic">{errors.city?.message}</p>
        </div>
        <div className="w-full md:w-1/3 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="state"
          >
            State / Province
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="state"
            {...register('state')}
            type="text"
            placeholder="Texas"
          />
          <p className="text-red-500 text-xs italic">{errors.state?.message}</p>
        </div>
        <div className="w-full md:w-1/3 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="postalCode"
          >
            Postal code
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="postalCode"
            {...register('postalCode')}
            type="text"
            placeholder="90210"
          />
          <p className="text-red-500 text-xs italic">{errors.postalCode?.message}</p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <h2 className="text-xl font-bold my-4">Billing information</h2>
        <div className="w-full px-3">
          <div className="flex items-center">
            <input
              className="appearance-none inline-block bg-gray-200 text-gray-700 border border-gray-200 rounded p-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-3"
              id="isBillingSameAsShipping"
              {...register('isBillingSameAsShipping')}
              type="checkbox"
            />
            <label
              className="inline-block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="isBillingSameAsShipping"
            >
              Same as shiping information
            </label>
          </div>
          <p className="text-red-500 text-xs italic">{errors.isBillingSameAsShipping?.message}</p>
        </div>
      </div>
      <div className="text-center">
        <button
          type="submit"
          onClick={onSubmit}
          className="py-3 px-8 rounded-xl shadow-lg bg-blue-500 text-white font-bold text-lg"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default CheckoutForm

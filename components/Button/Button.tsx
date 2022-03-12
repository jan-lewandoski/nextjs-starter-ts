import { ReactNode } from 'react'
import Spinner from './Spinner/Spinner'

interface ButtonProps {
  children: ReactNode
  className?: string
  loading?: boolean
  disabled?: boolean
  //eslint-disable-next-line
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({
  children,
  disabled = false,
  loading = false,
  className = '',
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={`bg-indigo-600 w-fit hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded flex ${className}`}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}

export default Button

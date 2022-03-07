import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  className?: string
  //eslint-disable-next-line
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ children, className = '', onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-indigo-500 w-fit hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  )
}

export default Button

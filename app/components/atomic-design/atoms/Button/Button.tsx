import classNames from 'classnames'
import { forwardRef } from 'react'

type ButtonFill = 'solid' | 'outline'
type ButtonVariant = 'primary' | 'gray' | 'danger'
type ButtonSize = 'small' | 'medium' | 'large'
type ButtonType = 'button' | 'submit'

export type ButtonProps = {
  fill?: ButtonFill
  size?: ButtonSize
  variant?: ButtonVariant
  disabled?: boolean
  type?: ButtonType
  className?: string
  ref?: React.MutableRefObject<HTMLButtonElement>
  pill?: boolean
  children: React.ReactNode
} & React.HTMLAttributes<HTMLButtonElement>

const classes = {
  base: 'focus:outline-none transition ease-in-out duration-300 rounded-lg',
  disabled: 'opacity-50 cursor-not-allowed',
  pill: 'rounded-full',
  size: {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-8 py-3 text-lg',
  },
  variant: {
    primary: {
      solid:
        'bg-primary-600 hover:bg-primary-800 focus:ring-2 focus:ring-primary-600 focus:ring-opacity-50 text-white',
      outline:
        'border-2 border-primary-600 text-primary-600 bg-white hover:bg-primary-800 hover:border-primary-800 hover:text-white focus:ring-2 focus:ring-primary-600 focus:ring-opacity-50',
    },
    gray: {
      solid:
        'bg-gray-500 hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-white hover:text-gray-300',
      outline:
        'border-2 border-gray-500 text-gray-500 bg-white hover:bg-gray-600 hover:border-gray-600 hover:text-white focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50',
    },
    danger: {
      solid:
        'bg-danger-500 hover:bg-danger-800 focus:ring-2 focus:ring-danger-500 focus:ring-opacity-50 text-white',
      outline:
        'border-2 border-danger-500 text-danger-500 bg-white hover:bg-danger-800 hodev:border-danger-800 hover:text-white focus:ring-2 focus:ring-red-600 focus:ring-opacity-50',
    },
  },
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'medium',
      variant = 'primary',
      fill = 'solid',
      type = 'button',
      disabled = false,
      className = '',
      pill = false,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={classNames(`
                ${classes.base}
                ${classes.size[size]}
                ${classes.variant[variant][fill]}
                ${pill && classes.pill}
                ${disabled && classes.disabled}
                ${className}
            `)}
      {...props}
    >
      {children}
    </button>
  ),
)

Button.displayName = 'Button'

export default Button

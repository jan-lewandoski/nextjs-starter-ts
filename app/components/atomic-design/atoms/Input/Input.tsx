import React, { FC, forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import classNames from 'classnames'

export type InputSize = 'small' | 'medium' | 'large'
export type InputType = 'text' | 'email'

export type InputProps = {
  id: string
  name: string
  label: string
  type?: InputType
  size?: InputSize
  className?: string
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size' | 'ref'>

// eslint-disable-next-line
const sizeMap: { [key in InputSize]: string } = {
  small: 'p-1 text-sm',
  medium: 'p-3 text-base',
  large: 'p-4 text-lg',
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, name, label, type = 'text', size = 'medium', className = '', placeholder, ...props },
    ref,
  ) => {
    return (
      <input
        id={id}
        ref={ref}
        name={name}
        type={type}
        aria-label={label}
        placeholder={placeholder}
        className={classNames([
          'appearance-none text-block w-full text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
          sizeMap[size],
          className,
        ])}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input

import React, { ChangeEvent, FC } from 'react'

interface InputProps {
    type: 'text' | 'number' | 'email' | 'password'
    label?: string
    value?: string | number
    name?: string
    placeholder?: string
    error: boolean
    disabled?: boolean
    className?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  }

export const Input: FC<InputProps> = ({
    type,
    label,
    value,
    name,
    placeholder,
    error,
    disabled,
    onChange,
    className
}) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={label}>{label}</label>
        <input
              type={type}
              id={label}
              value={value}
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              disabled={disabled}
              className={`${className} w-[200px] rounded-2xl bg-slate-300`}
        />
      {error && <p className="error">Polę nie może być puste</p>}
    </div>
  )
}


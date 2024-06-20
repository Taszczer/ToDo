import React, { ChangeEvent, forwardRef } from 'react';

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password';
  label?: string;
  value?: string | number;
  name?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
  className
}, ref) => {
  return (
    <div className="input-wrapper">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        ref={ref}
        type={type}
        id={name}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`${className} w-[300px] rounded-xl bg-purple-300 border-b-4 border-r-purple-500 border-b-purple-500 placeholder:text-purple-500 placeholder:font-bold border-r-4 px-4 py-1`}
      />
      {error && <p className="error">Polę nie może być puste</p>}
    </div>
  );
});

export default Input;
import React, { ChangeEvent, forwardRef, ReactNode } from 'react';

interface InputProps {
  type: 'text' | 'number' | 'email' | 'date' | 'datetime-local' | 'password';
  label?: string;
  value?: string | number;
  name?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
  className,
}, ref) => {
  return (
    <div className="input-wrapper flex flex-col ">
      {label && <label className=' font-medium ml-2 mb-1 ' htmlFor={name}>{label}</label>}
      <input
        ref={ref}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`${className} w-[300px] rounded-xl border-b-4 active:border-0  placeholder:text-white placeholder:font-bold border-r-4 px-4 py-1 active:outline-none focus:outline-none`}
      />
      {error && <p className="error">Polę nie może być puste</p>}
    </div>
  );
});

export default Input;
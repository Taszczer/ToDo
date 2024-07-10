import React, { FC, MouseEventHandler } from 'react';

interface ButtonProps {
  label?: string;
  name?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
}

export const Button: FC<ButtonProps> = ({
  label,
  name,
  onClick,
  disabled,
  className,
  type = 'button',
}) => {
  return (
    <div className='flex justify-center'>
      <label htmlFor={label}>{label}</label>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`${className} font-bold text-white rounded-xl border-b-4 border-r-4 px-4 py-1`}
      >
        {name}
      </button>
    </div>
  );
};

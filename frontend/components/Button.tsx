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
    <div>
      <label htmlFor={label}>{label}</label>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`${className} w-[250px] mt-2 font-bold text-purple-700 rounded-xl bg-purple-300 border-b-4 border-r-purple-500 border-b-purple-500 placeholder:text-purple-500 placeholder:font-bold border-r-4 px-4 py-1`}
      >
        {name}
      </button>
    </div>
  );
};

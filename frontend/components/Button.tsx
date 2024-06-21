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
        className={`${className} mt-2 font-bold text-white rounded-xl bg-orange-primary border-b-4 border-r-orange-secondary border-b-orange-secondary border-r-4 px-4 py-1`}
      >
        {name}
      </button>
    </div>
  );
};

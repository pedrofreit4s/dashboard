import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  customClassName?: string;
  register?: any;
}

export function Input({
  label,
  id,
  name,
  customClassName,
  register,
  ...rest
}: Props) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}

      <input
        id={id}
        {...rest}
        {...register(name)}
        className={`relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${customClassName}`}
      />
    </div>
  );
}

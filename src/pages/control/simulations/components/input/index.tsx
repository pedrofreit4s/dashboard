import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isRequired?: boolean;
  name: string;
  register: any;
  error?: any;
}

export const inputClassName =
  "w-full border border-simulation-input-border rounded-md h-[44px] px-4 bg-white shadow-simulation-input text-simulation-input-color placeholder:text-simulation-sm placeholder:text-simulation-input-placeholder focus:border-primary";

export function Input({ label, isRequired, name, register, error, ...rest }: Props) {
  return (
    <div className="flex flex-col gap-[5px]">
      <label htmlFor={name} className="text-simulation-label text-[14px] font-semibold">
        {label} <span className="text-red-600 text-md">{isRequired && "*"}</span>
      </label>
      <input className={`${inputClassName} ${error && "border-red-500"}`} id={name} {...register(name)} {...rest} />
      {error && <p className="text-red-500 text-simulation-sm">{error.message}</p>}
    </div>
  );
}

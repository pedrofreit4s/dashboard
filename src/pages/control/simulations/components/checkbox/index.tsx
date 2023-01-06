import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isRequired?: boolean;
  name?: string;
  isInfo?: boolean;
  infoText?: string;
  register?: any;
}

export function Checkbox({ label, register = () => {}, isRequired, name, isInfo, infoText, ...rest }: Props) {
  return (
    <div className="flex items-center gap-[10px] relative">
      <input
        type="checkbox"
        id={name}
        className="w-[24px] h-[24px] rounded-md border border-simulation-input-border"
        {...register(name)}
        {...rest}
      />
      <label htmlFor={name} className="text-simulation-label text-[14px] font-medium">
        {label} <span className="text-red-500">{isRequired && "*"}</span>
      </label>
      {isInfo && (
        <div className="group">
          <div className="flex items-center justify-center text-[10px] bg-simulation-bg rounded-full w-5 h-5 cursor-help">
            i
          </div>
          <div className="hidden group-hover:block absolute transition-all w-full text-simulation-sm text-simulation-title/80 bg-simulation-bg-contrast p-2 rounded-sm z-10">
            {infoText}
          </div>
        </div>
      )}
    </div>
  );
}

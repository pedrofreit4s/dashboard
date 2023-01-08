import { CaretDown, Check } from "phosphor-react";
import React from "react";

interface Props {
  title: string;
  subtitle: string;
  isActive?: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function StepCard({ title, subtitle, isActive, icon, onClick }: Props) {
  return (
    <div
      onClick={isActive ? onClick : undefined}
      className={`w-full rounded-md py-3 px-5 border  ${
        isActive ? "cursor-pointer shadow-simulation-md" : "cursor-not-allowed"
      } 
      ${isActive ? "bg-white hover:bg-white/75" : "bg-simulation-bg"}
      ${isActive ? "border-black/10" : "border-simulation-bg-contrast/10"}" transition-all`}
    >
      <div className="grid grid-cols-1 md:grid-cols-7 items-center">
        <div className="col-span-5">
          <div className="grid grid-cols-1 md:grid-cols-6 items-center">
            <div className="hidden md:block col-span-1">
              <div
                className={`w-9 h-9 rounded-md ${
                  isActive ? "bg-simulation-bg" : "bg-simulation-bg-contrast"
                } flex items-center justify-center 
                ${isActive ? "text-simulation-title" : "text-simulation-text/80"}
                `}
              >
                {icon}
              </div>
            </div>
            <div className="col-span-1 md:col-span-5">
              <h4
                className={`${
                  isActive ? "text-simulation-title" : "text-simulation-text/80"
                } text-simulation-md font-semibold`}
              >
                {title}
              </h4>
              <p
                className={`${
                  isActive ? "text-simulation-text" : "text-simulation-text/50"
                } text-simulation-sm mt-[-2px]`}
              >
                {subtitle}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center justify-end gap-1">
            <p className="text-simulation-text text-simulation-sm">selecionar</p>
            <div
              className={`w-5 h-5 bg-primary rounded-full flex items-center justify-center ${
                isActive ? "bg-primary text-white" : "bg-simulation-bg-contrast text-simulation-text/80"
              }`}
            >
              {isActive ? <Check weight="bold" size={12} /> : <CaretDown weight="bold" size={12} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

interface Props {
  emoji: string;
  title: string;
  text: string;
}

export function Alert({ emoji, title, text }: Props) {
  return (
    <div className="w-full bg-[#EDB900]/20 rounded-xl p-4">
      <div className="grid grid-cols-9">
        <div className="col-span-1">
          <div className="rounded-full flex items-center ml-3 text-simulation-text font-bold text-2xl">
            {emoji}
          </div>
        </div>

        <div className="col-span-8">
          <h3 className="text-[#5C4A04] font-semibold text-simulation-md">
            {title}
          </h3>
          <p className="text-[#B5A051] text-simulation-sm leading-[19px] mt-0">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

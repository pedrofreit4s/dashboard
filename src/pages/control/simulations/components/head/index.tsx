import React from "react";

interface Props {
  title: string;
  text?: string;
}

export function SimulationHead({ title, text }: Props) {
  return (
    <div className="text-center w-full max-w-[400px] mx-auto mt-[100px] mb-8">
      <div className="w-full flex justify-center">
        <img src="/flags.svg" alt="Flags" />
      </div>
      <h2 className="text-simulation-title text-simulation-xl font-bold mt-6">
        {title}
      </h2>
      <p className="text-simulation-text text-simulation-md leading-[26px] mt-1">
        {text}
      </p>
    </div>
  );
}

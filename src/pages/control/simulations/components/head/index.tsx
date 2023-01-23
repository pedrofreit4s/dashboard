import React from "react";
import { Button } from "../button";

interface Props {
  title: string;
  text?: string;
  mb0?: boolean;
  buttonAction?: () => void;
  buttonText?: string;
}

export function SimulationHead({ title, text, mb0, buttonAction, buttonText }: Props) {
  return (
    <div className={`text-center w-full max-w-[400px] mx-auto mt-[100px] ${!mb0 && "mb-8"}`}>
      <div className="w-full flex justify-center">
        <img src="/flags.svg" alt="Flags" />
      </div>
      <h2 className="text-simulation-title text-simulation-xl font-bold mt-6">{title}</h2>
      <p className="text-simulation-text text-simulation-md leading-[26px] mt-1">{text}</p>
      <div className="w-full flex justify-center py-4 pb-0">
        {buttonAction && (
          <Button
            onConfirm={buttonAction}
            confirmButtonText={buttonText || ".."}
            isLoading={false}
            confirmButtonIsActive
          />
        )}
      </div>
    </div>
  );
}

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "darker";
}

export function Button({ variant = "primary", ...rest }: ButtonProps) {
  return (
    <button
      className={`text-white px-4 py-2 rounded-md ${
        variant === "primary" ? "bg-primary" : "bg-black"
      }`}
      {...rest}
    />
  );
}

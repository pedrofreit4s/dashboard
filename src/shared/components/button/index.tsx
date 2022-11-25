import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "darker" | "primary-opacity";
  containsIcon?: boolean;
}

export function Button({
  containsIcon,
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`text-white px-4 py-2 rounded-md ${
        variant === "primary"
          ? "bg-primary"
          : variant === "primary-opacity"
          ? "bg-primary/5 text-primary"
          : "bg-black"
      } ${containsIcon && "flex items-center gap-2"}`}
      {...rest}
    />
  );
}

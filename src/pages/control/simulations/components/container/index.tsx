import React from "react";

interface Props {
  children: React.ReactNode;
}

export function Container({ children }: Props) {
  return <div className="w-full max-w-[520px] mx-auto">{children}</div>;
}

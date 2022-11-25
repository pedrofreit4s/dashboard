import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <div className="w-full mx-auto py-14 px-10 xl:px-18">{children}</div>;
}

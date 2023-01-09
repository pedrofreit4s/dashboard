import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  pt0?: boolean;
}

export function Container({ children, pt0 }: ContainerProps) {
  return <div className={`w-full mx-auto py-14 px-10 xl:px-18 ${pt0 && "pt-0"}`}>{children}</div>;
}

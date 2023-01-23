import { useState } from "react";

export function useLoading(defaultValue: boolean = false) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return { isLoading, setIsLoading };
}

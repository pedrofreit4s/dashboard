import { useEffect, useState } from "react";

export function useIsLoading(defaultValue: boolean = false) {
  const [isLoading, setIsLoading] = useState<boolean>(defaultValue);

  return { isLoading, setIsLoading };
}

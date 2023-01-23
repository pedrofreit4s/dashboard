import { useRef } from "react";

export function useDebounce() {
  const timeoutRef = useRef<NodeJS.Timeout>();

  function debounce(callback: () => Promise<any>, delay: number) {
    clearTimeout(timeoutRef.current);
    return (timeoutRef.current = setTimeout(() => {
      return callback();
    }, delay));
  }

  return { debounce };
}

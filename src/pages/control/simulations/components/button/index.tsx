import React from "react";

interface Props {
  confirmButtonIsActive?: boolean;
  confirmButtonText: string;
  isLoading?: boolean;
  onConfirm?: () => void;
}

export function Button({ confirmButtonIsActive, confirmButtonText, isLoading, onConfirm }: Props) {
  return (
    <button
      className={`px-5 py-2 rounded-md ${
        confirmButtonIsActive
          ? "bg-primary text-white"
          : "bg-simulation-bg-contrast text-simulation-text cursor-not-allowed"
      } text-simulation-md font-medium flex justify-center items-center`}
      type="submit"
      onClick={onConfirm}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        confirmButtonText
      )}
    </button>
  );
}

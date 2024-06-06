import { classNameMerge } from "~/app/utils/class-name-merge";
import { LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const baseButtonClassName =
  "font-medium px-3 py-1.5 text-[15px] flex justify-center focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-300 transition-colors hover:bg-indigo-400 bg-indigo-500 rounded-xl text-white";

export const Button = ({
  children,
  className,
  disabled,
  isLoading,
}: ButtonProps) => {
  return (
    <button
      className={classNameMerge(
        baseButtonClassName,
        (disabled || isLoading) && "opacity-50 cursor-not-allowed",
        className,
      )}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <LoaderCircle
          size={22}
          className="animate-spin"
          aria-label="Loading..."
        />
      ) : (
        children
      )}
    </button>
  );
};

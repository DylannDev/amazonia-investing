import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
} from "react";

import { cn } from "@/lib/utils";
import { SearchIcon, X as XIcon } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", onChange, value, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const hasValue = typeof value === "string" && value.length > 0;

    function handleClear() {
      // Prévenir le parent (contrôlé)
      if (onChange) {
        const event = {
          target: { value: "" },
        } as unknown as ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
      // Re-focus input
      inputRef.current?.focus();
    }

    return (
      <div className="flex items-center gap-2 px-3 text-sm font-medium border border-gray-300 rounded-lg">
        <SearchIcon className="w-4 h-4 text-gray-400" />
        <input
          type={type}
          className={cn(
            "flex h-12 w-full py-3 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400 font-normal",
            className
          )}
          ref={inputRef}
          value={value}
          onChange={onChange}
          {...props}
        />
        {hasValue ? (
          <button
            type="button"
            aria-label="Effacer la recherche"
            onClick={handleClear}
            className="shrink-0 text-gray-400 hover:text-gray-600"
          >
            <XIcon className="w-4 h-4" />
          </button>
        ) : null}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };

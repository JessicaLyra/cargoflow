import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`min-h-11 w-full rounded-lg border bg-white px-3 text-base text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-blue-100 ${
          error ? "border-[var(--error)]" : "border-[var(--border)]"
        } ${className}`}
        {...props}
      />

      {error && (
        <p className="mt-2 text-sm text-[var(--error)]">
          {error}
        </p>
      )}
    </div>
  );
}
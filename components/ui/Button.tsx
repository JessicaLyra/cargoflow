import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]",
    secondary:
      "border border-[var(--border)] bg-white text-[var(--text-primary)] hover:bg-slate-50",
    danger: "bg-[var(--error)] text-white hover:opacity-90",
  };

  return (
    <button
      className={`inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
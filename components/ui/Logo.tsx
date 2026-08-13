import { Boxes } from "lucide-react";

type LogoProps = {
  compact?: boolean;
  variant?: "dark" | "light";
};

export function Logo({
  compact = false,
  variant = "dark",
}: LogoProps) {
  const textColor =
    variant === "light"
      ? "text-white"
      : "text-[var(--text-primary)]";

  const subtitleColor =
    variant === "light"
      ? "text-blue-400"
      : "text-[var(--text-primary)]";

  return (
    <div className="flex items-center gap-3">
      <div className="flex size-15 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
        <Boxes size={35} strokeWidth={2} />
      </div>

      {!compact && (
        <div className="flex flex-col">
          <span
            className={`text-3xl font-semibold leading-none ${textColor}`}
          >
            CargoFlow
          </span>

          <span className={`mt-1.5 text-sm ${subtitleColor}`}>
            Gestão de importações
          </span>
        </div>
      )}
    </div>
  );
}
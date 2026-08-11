import { Boxes } from "lucide-react";

type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
        <Boxes size={22} strokeWidth={2} />
      </div>

      {!compact && (
        <div className="flex flex-col">
          <span className="text-lg font-semibold leading-none text-[var(--text-primary)]">
            CargoFlow
          </span>

          <span className="mt-1.5 text-sm text-[var(--text-secondary)]">
            Gestão de importações
          </span>
        </div>
      )}
    </div>
  );
}
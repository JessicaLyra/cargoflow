import { Bell, Menu } from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-[var(--border)] bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Abrir menu"
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-slate-100 hover:text-[var(--text-primary)] lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">
            Dashboard
          </h1>

          <p className="mt-1 hidden text-sm text-[var(--text-secondary)] sm:block">
            Visão geral das operações
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="Notificações"
          className="flex size-10 cursor-pointer items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-slate-100 hover:text-[var(--text-primary)]"
        >
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-white">
            JL
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              Jessica Lyra
            </p>

            <p className="text-sm text-[var(--text-secondary)]">
              Operadora
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
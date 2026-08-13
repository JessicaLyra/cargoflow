import { Bell, Menu } from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex min-h-20 items-center border-b border-[var(--border)] bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Abrir menu"
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-slate-100 hover:text-[var(--text-primary)] lg:hidden"
          >
            <Menu size={22} />
          </button>


          
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Notificações"
            className="relative flex size-10 cursor-pointer items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-slate-100 hover:text-[var(--text-primary)]"
          >
            <Bell size={20} />

            <span className="absolute right-2.5 top-2.5 size-2 rounded-full border-2 border-white bg-red-500" />
          </button>

          <div className="hidden h-8 w-px bg-[var(--border)] sm:block" />

          <button
            type="button"
            className="flex cursor-pointer items-center gap-3 rounded-xl px-1.5 py-1 transition-colors hover:bg-slate-50 sm:px-2"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-white">
              JL
            </div>

            <div className="hidden text-left md:block">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Jessica Lyra
              </p>

              <p className="text-xs text-[var(--text-secondary)]">
                Operadora
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
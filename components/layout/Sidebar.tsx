import {
  FileCheck2,
  Files,
  LayoutDashboard,
  LogOut,
  X,
} from "lucide-react";

import { Logo } from "@/components/ui/Logo";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={onClose}
          className="fixed inset-0 z-40 cursor-default bg-slate-950/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0F172A] px-4 py-6 transition-transform duration-300 lg:static lg:z-auto lg:min-h-screen lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-2">
          <Logo variant="light" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-10 flex flex-1 flex-col gap-2">
          <a
            href="#"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg bg-[var(--primary)] px-3 py-3 text-sm font-medium text-white"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </a>

          <a
            href="#"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <FileCheck2 size={20} />
            Averbação
          </a>

          <a
            href="#"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Files size={20} />
            Documentos
          </a>
        </nav>

        <div className="border-t border-white/10 pt-4">
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
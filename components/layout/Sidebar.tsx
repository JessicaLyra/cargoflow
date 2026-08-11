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

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Averbação",
    href: "/averbacao",
    icon: FileCheck2,
    active: false,
  },
  {
    label: "Documentos",
    href: "/documentos",
    icon: Files,
    active: false,
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button type="button" aria-label="Fechar menu" onClick={onClose} className="fixed inset-0 z-40 cursor-default bg-slate-950/60 backdrop-blur-[2px] lg:hidden" />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-hidden bg-[#0F172A] transition-transform duration-300 lg:static lg:z-auto lg:min-h-screen lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="relative border-b border-white/[0.08] px-6 py-6">
          <div className="pointer-events-none absolute -right-14 -top-14 size-32 rounded-full border border-blue-400/10" />
          <div className="pointer-events-none absolute -right-7 -top-7 size-20 rounded-full border border-blue-400/10" />

          <div className="relative flex items-center justify-between">
            <Logo variant="light" />

            <button type="button" onClick={onClose} aria-label="Fechar menu" className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white lg:hidden">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-4 py-6">
          <div>
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Operações
            </p>

            <nav className="mt-4 flex flex-col gap-1.5">
              {navigation.map(({ label, href, icon: Icon, active }) => (
                <a
                  key={label}
                  href={href}
                  onClick={onClose}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                    active
                      ? "bg-blue-500/10 text-white"
                      : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {active && (
                    <span className="absolute -left-4 h-8 w-1 rounded-r-full bg-[var(--primary)]" />
                  )}

                  <span
                    className={`flex size-9 items-center justify-center rounded-lg transition-colors ${
                      active
                        ? "bg-[var(--primary)] text-white"
                        : "bg-white/[0.04] text-slate-400 group-hover:bg-white/[0.08] group-hover:text-white"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.9} />
                  </span>

                  <span>{label}</span>

                  {active && (
                    <span className="ml-auto size-1.5 rounded-full bg-blue-400" />
                  )}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-auto">
            <div className="mb-5 rounded-xl border border-white/[0.08] bg-white/[0.035] p-4">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-30" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
                </span>

                <p className="text-sm font-medium text-slate-200">
                  Sistema operacional
                </p>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Serviços de averbação disponíveis e funcionando normalmente.
              </p>
            </div>

            <div className="border-t border-white/[0.08] pt-4">
              <button type="button" className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/[0.08] hover:text-red-300">
                <span className="flex size-9 items-center justify-center rounded-lg bg-white/[0.04] transition-colors group-hover:bg-red-500/10">
                  <LogOut size={18} strokeWidth={1.9} />
                </span>

                Sair
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
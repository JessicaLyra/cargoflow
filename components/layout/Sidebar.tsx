"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  },
  {
    label: "Averbação",
    href: "/averbacao",
    icon: FileCheck2,
  },
  {
    label: "Documentos",
    href: "/documentos",
    icon: Files,
  },
];

export function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={onClose}
          className="fixed inset-0 z-40 cursor-default bg-slate-950/60 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-70 flex-col overflow-hidden bg-[#0F172A] transition-transform duration-300 lg:static lg:z-auto lg:min-h-screen lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="relative border-b border-white/[0.08] px-6 py-6">
          <div className="pointer-events-none absolute -right-14 -top-14 size-32 rounded-full border border-blue-400/10" />

          <div className="pointer-events-none absolute -right-7 -top-7 size-20 rounded-full border border-blue-400/10" />

          <div className="relative flex items-center justify-between">
            <Logo variant="light" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 lg:hidden"
            >
              <X
                size={20}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-4 py-6">
          {/* Navegação */}
          <div>
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Operações
            </p>

            <nav
              aria-label="Navegação principal"
              className="mt-4"
            >
              <ul className="flex flex-col gap-1.5">
                {navigation.map(
                  ({
                    label,
                    href,
                    icon: Icon,
                  }) => {
                    const isActive =
                      pathname === href ||
                      pathname.startsWith(`${href}/`);

                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={onClose}
                          aria-current={
                            isActive
                              ? "page"
                              : undefined
                          }
                          className={`group relative flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                            isActive
                              ? "bg-white/[0.07] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
                              : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-100"
                          }`}
                        >
                          {/* Indicador ativo */}
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="absolute -left-4 bottom-2 top-2 w-[3px] rounded-r-full bg-blue-400"
                            />
                          )}

                          {/* Ícone */}
                          <span
                            className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-blue-400/10 text-blue-300"
                                : "text-slate-500 group-hover:bg-white/[0.05] group-hover:text-blue-300"
                            }`}
                          >
                            <Icon
                              size={18}
                              strokeWidth={1.9}
                              aria-hidden="true"
                            />
                          </span>

                          <span
                            className={
                              isActive
                                ? "font-semibold"
                                : ""
                            }
                          >
                            {label}
                          </span>
                        </Link>
                      </li>
                    );
                  },
                )}
              </ul>
            </nav>

            {/* Sair */}
            <div className="mt-5 border-t border-white/[0.08] pt-4">
              <Link
                href="/login"
                onClick={onClose}
                className="group flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-red-500/[0.07] hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-all duration-200 group-hover:bg-red-500/10 group-hover:text-red-300">
                  <LogOut
                    size={18}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                </span>

                <span>Sair</span>
              </Link>
            </div>
          </div>

          {/* Status do sistema */}
          <div className="mt-auto pt-6">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-4">
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
          </div>
        </div>
      </aside>
    </>
  );
}
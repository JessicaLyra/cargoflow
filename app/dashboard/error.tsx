"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/Button";

type DashboardErrorProps = {
  reset: () => void;
};

export default function DashboardError({ reset }: DashboardErrorProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <AlertTriangle size={26} strokeWidth={1.8} />
        </div>

        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          Não foi possível carregar o Dashboard
        </h2>

        <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
          Ocorreu um problema ao carregar os dados das operações. Tente novamente em alguns instantes.
        </p>

        <div className="mt-7 flex justify-center">
          <Button type="button" onClick={reset} className="gap-2">
            <RefreshCw size={18} />
            Tentar novamente
          </Button>
        </div>
      </div>
    </div>
  );
}
import {
  CalendarDays,
  Plane,
  Plus,
  Ship,
  Truck,
} from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { DocumentFlow } from "@/components/dashboard/DocumentFlow";
import { ModalCard } from "@/components/dashboard/ModalCard";
import { ProcessingQueue } from "@/components/dashboard/ProcessingQueue";
import { RecentDocuments } from "@/components/dashboard/RecentDocuments";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-up">
        {/* Cabeçalho */}
        <section className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-base font-semibold text-[var(--primary)]">
              Bom dia, Jessica! 👋
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
              Resumo das operações
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
              Confira os principais números e o andamento das operações de hoje.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex min-h-14 min-w-0 flex-1 items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 shadow-sm sm:flex-none sm:px-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                <CalendarDays size={19} />
              </div>

              <div className="min-w-0">
                <p className="whitespace-nowrap text-sm font-semibold text-[var(--text-primary)]">
                  12 de agosto, 2026
                </p>

                <p className="mt-0.5 text-xs font-medium text-[var(--text-secondary)]">
                  Quarta-feira
                </p>
              </div>
            </div>

            <Link href="/averbacao" className="shrink-0">
              <Button
                variant="action"
                className="h-14 gap-2 px-4 text-base font-semibold sm:px-5"
              >
                <Plus size={18} />

                <span className="hidden sm:inline">
                  Nova averbação
                </span>

                <span className="sm:hidden">
                  Nova averbação
                </span>
              </Button>
            </Link>
          </div>
        </section>

        {/* Quantidade por modal */}
        <section>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                Operações por modal
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                Distribuição de documentos
              </h2>
            </div>

            <p className="text-sm font-medium text-[var(--text-secondary)]">
              Total consolidado do dia
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ModalCard
              title="Aéreo"
              value={128}
              change={9}
              icon={Plane}
              tone="air"
            />

            <ModalCard
              title="Marítimo"
              value={246}
              change={14}
              icon={Ship}
              tone="maritime"
            />

            <ModalCard
              title="Rodoviário"
              value={94}
              change={5}
              icon={Truck}
              trend="down"
              tone="road"
            />
          </div>
        </section>

        {/* Fluxo das operações */}
        <DocumentFlow />

        {/* Área operacional */}
        <section className="grid gap-4 2xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.75fr)]">
          <RecentDocuments />
          <ProcessingQueue />
        </section>
      </div>
    </AppLayout>
  );
}
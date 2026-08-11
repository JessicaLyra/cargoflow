import { Plane, Ship, Truck } from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { DocumentFlow } from "@/components/dashboard/DocumentFlow";
import { ModalCard } from "@/components/dashboard/ModalCard";
import { ProcessingQueue } from "@/components/dashboard/ProcessingQueue";
import { RecentDocuments } from "@/components/dashboard/RecentDocuments";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--primary)]">
              Visão operacional
            </p>

            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
              Operações de importação
            </h2>

            <p className="mt-2 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
              Acompanhe o fluxo documental, os modais de transporte e o
              processamento das averbações em andamento.
            </p>
          </div>

          <Button className="w-full sm:w-auto">
            Nova averbação
          </Button>
        </div>

        <DocumentFlow />

        <section>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--primary)]">
                Distribuição operacional
              </p>

              <h3 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">
                Movimentação por modal
              </h3>
            </div>

            <p className="text-sm text-[var(--text-secondary)]">
              Volume consolidado das operações
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ModalCard
              title="Aéreo"
              value={128}
              change={9}
              processing={10}
              icon={Plane}
            />

            <ModalCard
              title="Marítimo"
              value={246}
              change={14}
              processing={18}
              icon={Ship}
            />

            <ModalCard
              title="Rodoviário"
              value={94}
              change={5}
              processing={6}
              icon={Truck}
              trend="down"
            />
          </div>
        </section>

        <section className="grid gap-4 2xl:grid-cols-[minmax(0,1.7fr)_minmax(360px,0.8fr)]">
          <RecentDocuments />
          <ProcessingQueue />
        </section>
      </div>
    </AppLayout>
  );
}
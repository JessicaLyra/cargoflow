import { ArrowRight, Plane, Ship, Truck } from "lucide-react";

import { StatusBadge } from "@/components/ui/StatusBadge";

const documents = [
  {
    date: "21/05/2025 09:41",
    id: "AVG250521-0032",
    process: "DUIMP",
    importer: "Atlas Comércio Exterior",
    broker: "ABC Comex",
    event: "Conclusão de averbação",
    user: "Juliana L.",
    modal: "Marítimo",
    modalIcon: Ship,
    status: "success" as const,
    statusLabel: "Concluído",
  },
  {
    date: "21/05/2025 09:38",
    id: "AVG250521-0031",
    process: "DI",
    importer: "NorteSul Importações",
    broker: "Global Trade",
    event: "Documentos anexados",
    user: "Carlos M.",
    modal: "Aéreo",
    modalIcon: Plane,
    status: "processing" as const,
    statusLabel: "Processando",
  },
  {
    date: "21/05/2025 09:34",
    id: "AVG250521-0030",
    process: "DUIMP",
    importer: "Mercosul Trading",
    broker: "LogisBrasil",
    event: "Início de processamento",
    user: "Mariana S.",
    modal: "Rodoviário",
    modalIcon: Truck,
    status: "processing" as const,
    statusLabel: "Processando",
  },
  {
    date: "21/05/2025 09:28",
    id: "AVG250521-0029",
    process: "DI",
    importer: "Oceânica Import",
    broker: "ABC Comex",
    event: "Falha no processamento",
    user: "Juliana L.",
    modal: "Aéreo",
    modalIcon: Plane,
    status: "error" as const,
    statusLabel: "Falha",
  },
];

export function RecentDocuments() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
      <div className="flex flex-col gap-4 border-b border-[var(--border)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--primary)]">
            Atividade recente
          </p>

          <h3 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">
            Últimas movimentações
          </h3>
        </div>

        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 text-sm font-medium text-[var(--primary)] transition-opacity hover:opacity-70"
        >
          Ver todas
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] bg-slate-50/70 text-left">
              <th className="px-6 py-4 text-sm font-medium text-[var(--text-secondary)]">
                Data/Hora
              </th>

              <th className="px-6 py-4 text-sm font-medium text-[var(--text-secondary)]">
                Averbação
              </th>

              <th className="px-6 py-4 text-sm font-medium text-[var(--text-secondary)]">
                Modal
              </th>

              <th className="px-6 py-4 text-sm font-medium text-[var(--text-secondary)]">
                Comissária
              </th>

              <th className="px-6 py-4 text-sm font-medium text-[var(--text-secondary)]">
                Evento
              </th>

              <th className="px-6 py-4 text-sm font-medium text-[var(--text-secondary)]">
                Status
              </th>

              <th className="px-6 py-4 text-sm font-medium text-[var(--text-secondary)]">
                Usuário
              </th>
            </tr>
          </thead>

          <tbody>
            {documents.map((document) => {
              const ModalIcon = document.modalIcon;

              return (
                <tr
                  key={document.id}
                  className="border-b border-[var(--border)] transition-colors last:border-b-0 hover:bg-slate-50/60"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[var(--text-secondary)]">
                    {document.date}
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <p className="font-mono text-sm font-medium text-[var(--primary)]">
                        {document.id}
                      </p>

                      <p className="mt-1 text-xs text-[var(--text-secondary)]">
                        {document.process}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ModalIcon
                        size={18}
                        strokeWidth={1.8}
                        className="text-[var(--primary)]"
                      />

                      <span className="text-sm text-[var(--text-primary)]">
                        {document.modal}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-[var(--text-primary)]">
                    {document.broker}
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-[var(--text-primary)]">
                        {document.event}
                      </p>

                      <p className="mt-1 text-xs text-[var(--text-secondary)]">
                        {document.importer}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={document.status}>
                      {document.statusLabel}
                    </StatusBadge>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[var(--text-secondary)]">
                    {document.user}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-[var(--border)] lg:hidden">
        {documents.map((document) => {
          const ModalIcon = document.modalIcon;

          return (
            <article key={document.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-sm font-medium text-[var(--primary)]">
                    {document.id}
                  </p>

                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {document.date}
                  </p>
                </div>

                <StatusBadge status={document.status}>
                  {document.statusLabel}
                </StatusBadge>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                    Modal
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <ModalIcon
                      size={17}
                      strokeWidth={1.8}
                      className="text-[var(--primary)]"
                    />

                    <span className="text-sm text-[var(--text-primary)]">
                      {document.modal}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                    Comissária
                  </p>

                  <p className="mt-2 text-sm text-[var(--text-primary)]">
                    {document.broker}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                  Evento
                </p>

                <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">
                  {document.event}
                </p>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {document.importer}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="border-t border-[var(--border)] px-6 py-4">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 text-sm font-medium text-[var(--primary)] transition-opacity hover:opacity-70"
        >
          Ver todas as atividades
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
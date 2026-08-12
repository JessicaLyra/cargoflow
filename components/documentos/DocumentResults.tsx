import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Plane,
  Ship,
  Truck,
} from "lucide-react";

import type {
  DocumentOperation,
  DocumentStatus,
} from "@/types/document";

type DocumentResultsProps = {
  operations: DocumentOperation[];
  onSelect: (operation: DocumentOperation) => void;
};

const statusConfig: Record<
  DocumentStatus,
  {
    label: string;
    className: string;
    icon: typeof Clock3;
  }
> = {
  PROCESSING: {
    label: "Em processamento",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
    icon: Clock3,
  },
  COMPLETED: {
    label: "Concluído",
    className: "bg-green-50 text-green-700 ring-green-200",
    icon: CheckCircle2,
  },
  FAILED: {
    label: "Falha",
    className: "bg-red-50 text-red-700 ring-red-200",
    icon: AlertCircle,
  },
};

export function DocumentResults({
  operations,
  onSelect,
}: DocumentResultsProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4 sm:px-6">
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            Operações encontradas
          </p>

          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {operations.length}{" "}
            {operations.length === 1 ? "resultado" : "resultados"}
          </p>
        </div>

        <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-[var(--primary)]">
          <FileText size={19} />
        </div>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {operations.map((operation) => {
          const status = statusConfig[operation.status];
          const StatusIcon = status.icon;

          const ModalIcon =
            operation.modal === "Aéreo"
              ? Plane
              : operation.modal === "Rodoviário"
                ? Truck
                : Ship;

          return (
            <button
              key={operation.id}
              type="button"
              onClick={() => onSelect(operation)}
              className="group grid w-full cursor-pointer gap-5 px-5 py-5 text-left transition hover:bg-slate-50/70 sm:px-6 lg:grid-cols-[minmax(230px,1.4fr)_minmax(170px,1fr)_130px_120px] lg:items-center xl:grid-cols-[minmax(240px,1.4fr)_minmax(180px,1fr)_130px_120px_150px_110px_24px]"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                    {operation.documentType}
                  </span>

                  <p className="font-mono text-sm font-semibold text-[var(--text-primary)]">
                    {operation.documentNumber}
                  </p>
                </div>

                <p className="mt-2 truncate text-sm font-medium text-[var(--text-primary)]">
                  {operation.importer}
                </p>

                <p className="mt-1 font-mono text-xs text-[var(--text-secondary)]">
                  DTA {operation.dta}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  País de origem
                </p>

                <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">
                  {operation.country}
                </p>

                <p className="mt-1 font-mono text-xs text-[var(--text-secondary)]">
                  {operation.knowledgeNumber}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Data do envio
                </p>

                <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">
                  {operation.createdAt}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Modal
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
                  <ModalIcon
                    size={17}
                    className="text-[var(--primary)]"
                  />

                  {operation.modal}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Status
                </p>

                <div className="mt-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${status.className}`}
                  >
                    <StatusIcon size={14} />
                    {status.label}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Arquivos
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <FileText
                    size={16}
                    className="text-[var(--primary)]"
                  />

                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {operation.files.length}
                  </span>

                  <span className="text-xs text-[var(--text-secondary)]">
                    {operation.files.length === 1
                      ? "arquivo"
                      : "arquivos"}
                  </span>
                </div>
              </div>

              <ChevronRight
                size={20}
                className="hidden text-slate-300 transition group-hover:translate-x-1 group-hover:text-[var(--primary)] xl:block"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
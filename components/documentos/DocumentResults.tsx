import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileStack,
  FileText,
  Globe2,
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
    className:
      "bg-[var(--warning-light)] text-[var(--warning-dark)] ring-amber-200",
    icon: Clock3,
  },

  COMPLETED: {
    label: "Concluído",
    className:
      "bg-[var(--success-light)] text-[var(--success-dark)] ring-green-200",
    icon: CheckCircle2,
  },

  FAILED: {
    label: "Falha",
    className:
      "bg-[var(--error-light)] text-[var(--error-dark)] ring-red-200",
    icon: AlertCircle,
  },
};

export function DocumentResults({
  operations,
  onSelect,
}: DocumentResultsProps) {
  return (
    <section className="space-y-4">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
            Resultado
          </p>

          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Operações encontradas
          </h3>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full bg-[var(--surface-secondary)] px-3 py-1.5">
          <FileStack
            size={16}
            className="text-[var(--primary)]"
            aria-hidden="true"
          />

          <span className="text-sm font-semibold text-[var(--text-primary)]">
            {operations.length}
          </span>

          <span className="text-sm text-[var(--text-secondary)]">
            {operations.length === 1 ? "resultado" : "resultados"}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {operations.map((operation) => {
          const status = statusConfig[operation.status];
          const StatusIcon = status.icon;

          const ModalIcon =
            operation.modal === "Aéreo"
              ? Plane
              : operation.modal === "Rodoviário"
                ? Truck
                : Ship;

          const modalClass =
            operation.modal === "Aéreo"
              ? "bg-violet-50 text-violet-700 ring-violet-200"
              : operation.modal === "Rodoviário"
                ? "bg-orange-50 text-orange-700 ring-orange-200"
                : "bg-blue-50 text-blue-700 ring-blue-200";

          return (
            <button
              key={operation.id}
              type="button"
              onClick={() => onSelect(operation)}
              className="group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-[var(--surface)] text-left shadow-sm ring-1 ring-[var(--border)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            >
              {/* Destaque lateral */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 bg-[var(--primary)]"
              />

              <div className="p-5 sm:p-6">
                {/* Resumo principal */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                      <FileText
                        size={22}
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-[var(--surface-secondary)] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[var(--text-secondary)]">
                          {operation.documentType}
                        </span>

                        <h4 className="break-all font-mono text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                          {operation.documentNumber}
                        </h4>
                      </div>

                      <p className="mt-2 text-base font-semibold text-[var(--text-primary)]">
                        {operation.importer}
                      </p>

                      <p className="mt-1 font-mono text-sm text-[var(--text-secondary)]">
                        DTA {operation.dta}
                      </p>
                    </div>
                  </div>

                  {/* Modal + status */}
                  <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ring-inset ${modalClass}`}
                    >
                      <ModalIcon size={15} aria-hidden="true" />
                      {operation.modal}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ring-inset ${status.className}`}
                    >
                      <StatusIcon size={15} aria-hidden="true" />
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Dados rápidos */}
                <div className="mt-5 grid gap-3 rounded-xl bg-[var(--surface-secondary)]/65 p-4 sm:grid-cols-2 xl:grid-cols-4">
                  <InfoBlock
                    icon={Globe2}
                    label="País de origem"
                    value={operation.country}
                  />

                  <InfoBlock
                    icon={CalendarDays}
                    label="Data do envio"
                    value={operation.createdAt}
                  />

                  <InfoBlock
                    icon={FileText}
                    label="Conhecimento"
                    value={operation.knowledgeNumber}
                    mono
                  />

                  <div className="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                        <FileStack
                          size={17}
                          aria-hidden="true"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                          Arquivos
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                          {operation.files.length}{" "}
                          {operation.files.length === 1
                            ? "arquivo"
                            : "arquivos"}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={20}
                      className="text-[var(--text-muted)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--primary)]"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

type InfoBlockProps = {
  icon: typeof Globe2;
  label: string;
  value: string;
  mono?: boolean;
};

function InfoBlock({
  icon: Icon,
  label,
  value,
  mono = false,
}: InfoBlockProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg px-2 py-2">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-[var(--primary)] shadow-sm">
        <Icon
          size={17}
          strokeWidth={1.9}
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
          {label}
        </p>

        <p
          className={`mt-1 break-words text-sm font-semibold text-[var(--text-primary)] ${
            mono ? "font-mono" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
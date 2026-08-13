import {
  Building2,
  CalendarDays,
  FileText,
  Globe2,
  Plane,
  Ship,
  Truck,
} from "lucide-react";

import type { DtaOperation } from "@/types/dta";

type OperationDataProps = {
  operation: DtaOperation;
};

export function OperationData({
  operation,
}: OperationDataProps) {
  const ModalIcon =
    operation.modal === "Aéreo"
      ? Plane
      : operation.modal === "Rodoviário"
        ? Truck
        : Ship;

  const modalStyles =
    operation.modal === "Aéreo"
      ? {
          badge:
            "bg-violet-50 text-violet-700 ring-violet-200",
          icon:
            "bg-violet-100 text-violet-700 ring-violet-200",
        }
      : operation.modal === "Rodoviário"
        ? {
            badge:
              "bg-orange-50 text-orange-700 ring-orange-200",
            icon:
              "bg-orange-100 text-orange-700 ring-orange-200",
          }
        : {
            badge:
              "bg-blue-50 text-blue-700 ring-blue-200",
            icon:
              "bg-blue-100 text-blue-700 ring-blue-200",
          };

  const items = [
    {
      label: "Número da DTA",
      value: operation.dta,
      icon: FileText,
      important: true,
    },
    {
      label: "Importador",
      value: operation.importer,
      icon: Building2,
      important: true,
    },
    {
      label: "Data de cadastro",
      value: operation.registrationDate,
      icon: CalendarDays,
    },
    {
      label: "País de origem",
      value: operation.country,
      icon: Globe2,
    },
    {
      label: "Número do conhecimento",
      value: operation.knowledgeNumber,
      icon: FileText,
    },
  ];

  return (
    <aside className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
      {/* Destaque lateral */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 bg-[var(--primary)]"
      />

      {/* Cabeçalho */}
      <div className="relative border-b border-[var(--border)] bg-gradient-to-br from-[var(--primary-light)]/70 via-white to-white px-6 py-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full border border-blue-100"
        />

        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--primary)]">
          Dossiê do importador
        </p>

        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          Dados da operação
        </h3>

        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          Informações vinculadas à DTA localizada.
        </p>
      </div>

      {/* Modal em destaque */}
      <div className="border-b border-[var(--border)] px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
          Modal da operação
        </p>

        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${modalStyles.icon}`}
            >
              <ModalIcon
                size={21}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                {operation.modal}
              </p>

              <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
                Modal de transporte
              </p>
            </div>
          </div>

          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${modalStyles.badge}`}
          >
            Ativo
          </span>
        </div>
      </div>

      {/* Dados */}
      <div className="px-6">
        {items.map(
          ({
            label,
            value,
            icon: Icon,
            important,
          }) => (
            <div
              key={label}
              className="flex gap-4 border-b border-[var(--border)] py-5 last:border-b-0"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] ring-1 ring-inset ring-blue-100">
                <Icon
                  size={18}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {label}
                </p>

                <p
                  className={`mt-1.5 break-words leading-6 text-[var(--text-primary)] ${
                    important
                      ? "text-base font-semibold"
                      : "text-sm font-medium"
                  }`}
                >
                  {value}
                </p>
              </div>
            </div>
          ),
        )}
      </div>

      {/* Rodapé contextual */}
      <div className="border-t border-[var(--border)] bg-[var(--surface-secondary)]/45 px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[var(--success)]" />

          <p className="text-sm font-medium text-[var(--text-secondary)]">
            Dados carregados a partir da DTA consultada.
          </p>
        </div>
      </div>
    </aside>
  );
}
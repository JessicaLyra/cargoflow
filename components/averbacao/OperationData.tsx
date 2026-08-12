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

export function OperationData({ operation }: OperationDataProps) {
  const ModalIcon =
    operation.modal === "Aéreo"
      ? Plane
      : operation.modal === "Rodoviário"
        ? Truck
        : Ship;

  const items = [
    {
      label: "Número da DTA",
      value: operation.dta,
      icon: FileText,
    },
    {
      label: "Razão Social do Importador",
      value: operation.importer,
      icon: Building2,
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
      label: "Modal",
      value: operation.modal,
      icon: ModalIcon,
    },
    {
      label: "Número do Conhecimento",
      value: operation.knowledgeNumber,
      icon: FileText,
    },
  ];

  return (
    <aside className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">
      <div className="absolute bottom-0 left-0 top-0 w-1 bg-[var(--primary)]" />

      <div className="border-b border-[var(--border)] px-6 py-5">
        <p className="text-sm font-medium text-[var(--primary)]">
          Dossiê do importador
        </p>

        <h3 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
          Dados da operação
        </h3>
      </div>

      <div className="px-6">
        {items.map(({ label, value, icon: Icon }, index) => (
          <div
            key={label}
            className="relative flex gap-4 border-b border-[var(--border)] py-5 last:border-b-0"
          >
            {index !== items.length - 1 && (
              <div className="absolute left-[19px] top-12 h-[calc(100%-20px)] w-px bg-blue-100" />
            )}

            <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-[var(--primary)]">
              <Icon size={18} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-[var(--text-secondary)]">
                {label}
              </p>

              <p className="mt-1 break-words text-sm font-medium leading-6 text-[var(--text-primary)]">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
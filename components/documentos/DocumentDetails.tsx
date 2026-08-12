import {
  Download,
  Eye,
  FileText,
  Plane,
  Ship,
  Truck,
  X,
} from "lucide-react";

import { StatusBadge } from "@/components/ui/StatusBadge";
import type { DocumentOperation } from "@/types/document";

type DocumentDetailsProps = {
  operation: DocumentOperation;
  onClose: () => void;
};

export function DocumentDetails({
  operation,
  onClose,
}: DocumentDetailsProps) {
  const ModalIcon =
    operation.modal === "Aéreo"
      ? Plane
      : operation.modal === "Rodoviário"
        ? Truck
        : Ship;

  const statusMap = {
    PROCESSING: {
      status: "processing" as const,
      label: "Em processamento",
    },
    COMPLETED: {
      status: "success" as const,
      label: "Concluído",
    },
    FAILED: {
      status: "error" as const,
      label: "Falha",
    },
  };

  const currentStatus = statusMap[operation.status];

  return (
    <section className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-5 py-5 sm:px-6">
        <div>
          <p className="text-sm font-medium text-[var(--primary)]">
            Detalhes da operação
          </p>

          <h3 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">
            {operation.documentType} {operation.documentNumber}
          </h3>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Consulte o status da operação e os arquivos vinculados.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[var(--text-secondary)] transition hover:bg-slate-100 hover:text-[var(--text-primary)]"
        >
          <X size={19} />
        </button>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-5 sm:p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Status
              </p>

              <div className="mt-2">
                <StatusBadge status={currentStatus.status}>
                  {currentStatus.label}
                </StatusBadge>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Modal
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
                <ModalIcon
                  size={18}
                  className="text-[var(--primary)]"
                />

                {operation.modal}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Tipo de documento
              </p>

              <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">
                {operation.documentType}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Total de arquivos
              </p>

              <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">
                {operation.files.length}{" "}
                {operation.files.length === 1
                  ? "arquivo enviado"
                  : "arquivos enviados"}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] bg-slate-50/60 p-5 sm:p-6 lg:border-l lg:border-t-0">
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              Arquivos vinculados
            </p>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Visualize ou faça o download dos documentos enviados.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {operation.files.map((file) => (
              <div
                key={file.name}
                className="rounded-xl border border-[var(--border)] bg-white p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[var(--primary)]">
                    <FileText size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      {file.type} · {file.size}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-white text-sm font-medium text-[var(--text-primary)] transition hover:bg-slate-50"
                    >
                      <Eye size={16} />
                      Visualizar
                    </a>

                    <a
                      href={file.url}
                      download={file.name}
                      className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--primary)] text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
                    >
                      <Download size={16} />
                      Baixar
                    </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import {
  Download,
  Eye,
  FileCheck2,
  FileText,
  Files,
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

  const modalStyles =
    operation.modal === "Aéreo"
      ? {
          icon: "bg-violet-100 text-violet-700",
          badge:
            "bg-violet-50 text-violet-700 ring-violet-200",
        }
      : operation.modal === "Rodoviário"
        ? {
            icon: "bg-orange-100 text-orange-700",
            badge:
              "bg-orange-50 text-orange-700 ring-orange-200",
          }
        : {
            icon: "bg-blue-100 text-blue-700",
            badge:
              "bg-blue-50 text-blue-700 ring-blue-200",
          };

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

  const fileCount = operation.files.length;

  return (
    <section className="overflow-hidden rounded-2xl bg-[var(--surface-secondary)]/75 shadow-sm ring-1 ring-[var(--border)]">
      {/* Cabeçalho */}
      <div className="relative overflow-hidden px-6 pb-5 pt-6 lg:px-8 lg:pt-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full border border-blue-200/50"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-10 top-8 size-24 rounded-full border border-blue-200/40"
        />

        <div className="relative flex items-start justify-between gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
              Detalhes da operação
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                {operation.documentType}{" "}
                <span className="font-mono">
                  {operation.documentNumber}
                </span>
              </h3>

              <StatusBadge status={currentStatus.status}>
                {currentStatus.label}
              </StatusBadge>
            </div>

            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
              Consulte as informações completas da operação e acesse os
              documentos vinculados.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes"
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-white text-[var(--text-secondary)] shadow-sm ring-1 ring-[var(--border)] transition hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Resumo da operação */}
      <div className="grid gap-4 px-6 pb-6 md:grid-cols-3 lg:px-8">
        {/* Modal */}
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Modal
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div
              className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${modalStyles.icon}`}
            >
              <ModalIcon
                size={22}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                {operation.modal}
              </p>

              <span
                className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${modalStyles.badge}`}
              >
                Transporte
              </span>
            </div>
          </div>
        </article>

        {/* Tipo de documento */}
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Tipo de documento
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
              <FileCheck2
                size={22}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </div>

            <div>
              <p className="text-xl font-semibold text-[var(--text-primary)]">
                {operation.documentType}
              </p>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Documento da operação
              </p>
            </div>
          </div>
        </article>

        {/* Arquivos */}
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Arquivos enviados
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
              <Files
                size={22}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </div>

            <div className="flex items-end gap-2">
              <strong className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                {fileCount}
              </strong>

              <span className="pb-1 text-sm font-medium text-[var(--text-secondary)]">
                {fileCount === 1 ? "arquivo" : "arquivos"}
              </span>
            </div>
          </div>
        </article>
      </div>

      {/* Documentação */}
      <div className="px-6 pb-8 lg:px-8">
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
                Documentação
              </p>

              <h4 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                Arquivos vinculados
              </h4>

              <p className="mt-2 text-base leading-7 text-[var(--text-secondary)]">
                Visualize os documentos enviados ou salve uma cópia local.
              </p>
            </div>

            <span className="w-fit rounded-full bg-[var(--surface-secondary)] px-3 py-1.5 text-sm font-semibold text-[var(--text-secondary)]">
              {fileCount} {fileCount === 1 ? "documento" : "documentos"}
            </span>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            {operation.files.map((file) => (
              <article
                key={file.name}
                className="group overflow-hidden rounded-2xl bg-[var(--surface-secondary)]/65 transition duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--primary)] shadow-sm">
                      <FileText
                        size={22}
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate text-base font-semibold text-[var(--text-primary)]"
                        title={file.name}
                      >
                        {file.name}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold uppercase text-[var(--text-secondary)] shadow-sm">
                          {file.type}
                        </span>

                        <span className="text-sm font-medium text-[var(--text-secondary)]">
                          {file.size}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="grid grid-cols-2 gap-2 px-5 pb-5">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-[var(--text-primary)] shadow-sm transition hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                  >
                    <Eye size={17} aria-hidden="true" />
                    Visualizar
                  </a>

                  <a
                    href={file.url}
                    download={file.name}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                  >
                    <Download size={17} aria-hidden="true" />
                    Baixar
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import {
  LoaderCircle,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

import { FeedbackMessage } from "@/components/ui/FeedbackMessage";
import { searchDocuments } from "@/lib/api/documents";
import type { DocumentOperation } from "@/types/document";

type DocumentSearchProps = {
  onResults: (results: DocumentOperation[]) => void;
};

export function DocumentSearch({
  onResults,
}: DocumentSearchProps) {
  const [documentNumber, setDocumentNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function isValidDocumentNumber(value: string) {
    const normalizedValue = value.trim().toUpperCase();

    const dtaOrDiPattern = /^\d{2}\/\d{7}-\d$/;
    const duimpPattern = /^\d{2}BR\d{10}-\d$/;

    return (
      dtaOrDiPattern.test(normalizedValue) ||
      duimpPattern.test(normalizedValue)
    );
  }

  async function handleSearch() {
    const normalizedNumber = documentNumber
      .trim()
      .toUpperCase();

    if (!normalizedNumber) {
      setError("Informe uma DTA, DI ou DUIMP.");
      onResults([]);
      return;
    }

    if (!isValidDocumentNumber(normalizedNumber)) {
      setError(
        "Formato inválido. Use DTA/DI: 25/0000000-1 ou DUIMP: 26BR0000123456-7.",
      );
      onResults([]);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const results = await searchDocuments(
        normalizedNumber,
      );

      onResults(results);

      if (results.length === 0) {
        setError(
          "Nenhum documento encontrado para o número informado.",
        );
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível realizar a consulta.";

      setError(message);
      onResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClear() {
    setDocumentNumber("");
    setError(null);
    onResults([]);
  }

  const hasValue = documentNumber.trim().length > 0;

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm">
      {/* Cabeçalho */}
      <div className="border-b border-[var(--border)] px-5 py-4 sm:px-6">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Localizar documentos
        </h3>

        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Informe uma DTA, DI ou DUIMP para localizar as operações vinculadas.
        </p>
      </div>

      {/* Área de busca */}
      <div className="p-5 sm:p-6">
        <label
          htmlFor="documentNumber"
          className="mb-2 block text-sm font-semibold text-[var(--text-primary)]"
        >
          DTA, DI ou DUIMP
        </label>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <div className="relative">
              <Search
                size={18}
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
              />

              <input
                id="documentNumber"
                type="text"
                value={documentNumber}
                onChange={(event) => {
                  setDocumentNumber(event.target.value);
                  setError(null);
                }}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !isLoading &&
                    hasValue
                  ) {
                    handleSearch();
                  }
                }}
                placeholder="Ex.: 25/9876543-1 ou 26BR0000123456-7"
                className={`h-12 w-full rounded-xl border bg-[var(--primary-light)]/35 pl-12 pr-12 text-base font-medium text-[var(--text-primary)] outline-none transition placeholder:font-normal placeholder:text-[var(--text-muted)] focus:bg-white focus:ring-2 focus:ring-blue-100 ${
                  error
                    ? "border-[var(--error)] focus:border-[var(--error)]"
                    : "border-blue-100 focus:border-[var(--primary)]"
                }`}
              />

              {hasValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={isLoading}
                  aria-label="Limpar consulta"
                  className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/80 text-[var(--text-secondary)] transition hover:bg-white hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X
                    size={15}
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>

            {!error && (
              <p className="mt-2 text-xs text-[var(--text-secondary)]">
                DTA/DI: 25/0000000-1 · DUIMP: 26BR0000123456-7
              </p>
            )}

            {error && (
              <div className="mt-3">
                <FeedbackMessage
                  variant="error"
                  message={error}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading || !hasValue}
            className="flex h-12 min-w-44 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--action)] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--action-hover)] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
          >
            {isLoading ? (
              <>
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                  aria-hidden="true"
                />

                Consultando...
              </>
            ) : (
              <>
                <Search
                  size={18}
                  aria-hidden="true"
                />

                Consultar
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
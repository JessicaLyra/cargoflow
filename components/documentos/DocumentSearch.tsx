"use client";

import {
  AlertCircle,
  LoaderCircle,
  Search,
} from "lucide-react";
import { useState } from "react";

import { searchDocuments } from "@/lib/api/documents";
import type { DocumentOperation } from "@/types/document";

type DocumentSearchProps = {
  onResults: (results: DocumentOperation[]) => void;
};

export function DocumentSearch({ onResults }: DocumentSearchProps) {
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
    const normalizedNumber = documentNumber.trim().toUpperCase();

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

    const results = await searchDocuments(normalizedNumber);

    setIsLoading(false);
    onResults(results);

    if (results.length === 0) {
      setError("Nenhum documento encontrado para o número informado.");
    }
  }

  return (
    <section className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">
      <div className="border-b border-[var(--border)] px-5 py-4 sm:px-6">
        <p className="text-sm font-semibold text-[var(--text-primary)]">
          Localizar documentos
        </p>

        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Informe uma DTA, DI ou DUIMP para localizar os documentos relacionados.
        </p>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="flex-1">
            <label htmlFor="documentNumber" className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              DTA, DI ou DUIMP
            </label>

            <div className="relative">
              <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />

              <input
                id="documentNumber"
                type="text"
                value={documentNumber}
                onChange={(event) => {
                  setDocumentNumber(event.target.value);
                  setError(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Ex.: 25/0000000-1 ou 26BR0000123456-7"
                className={`h-11 w-full rounded-lg border bg-white pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition focus:ring-2 focus:ring-blue-100 ${
                  error
                    ? "border-[var(--error)] focus:border-[var(--error)]"
                    : "border-[var(--border)] focus:border-[var(--primary)]"
                }`}
              />
            </div>

            <p className="mt-2 text-xs text-[var(--text-secondary)]">
              DTA/DI: 25/0000000-1 · DUIMP: 26BR0000123456-7
            </p>

            {error && (
              <div className="mt-2 flex items-center gap-2 text-sm text-[var(--error)]">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading}
            className="mt-7 flex h-11 min-w-32 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50 lg:mt-7"
          >
            {isLoading ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                Consultando...
              </>
            ) : (
              <>
                <Search size={18} />
                Consultar
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
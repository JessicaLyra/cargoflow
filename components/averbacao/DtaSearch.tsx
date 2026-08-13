"use client";

import {
  CheckCircle2,
  LoaderCircle,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

import { FeedbackMessage } from "@/components/ui/FeedbackMessage";
import { getDtaOperation } from "@/lib/api/dta";
import { dtaSchema } from "@/lib/validations/dta";
import type { DtaOperation } from "@/types/dta";

type DtaSearchProps = {
  onSearch: (operation: DtaOperation) => void;
  onClearResult: () => void;
  searchedDta?: string | null;
};

export function DtaSearch({
  onSearch,
  onClearResult,
  searchedDta,
}: DtaSearchProps) {
  const [dta, setDta] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch() {
    const result = dtaSchema.safeParse(dta);

    if (!result.success) {
      setError(
        result.error.issues[0]?.message ?? "DTA inválida.",
      );

      onClearResult();
      return;
    }

    setError(null);
    setIsLoading(true);
    onClearResult();

    try {
      const operation = await getDtaOperation(result.data);

      if (!operation) {
        setError(
          "DTA não encontrada. Verifique o número informado.",
        );
        return;
      }

      onSearch(operation);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível consultar a DTA.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClear() {
    setDta("");
    setError(null);
    onClearResult();
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm">
      {/* Cabeçalho */}
      <div className="border-b border-[var(--border)] px-5 py-4 sm:px-6">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Localizar DTA
        </h3>

        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Informe o número da DTA para localizar os dados da operação.
        </p>
      </div>

      {/* Área de busca */}
      <div className="p-5 sm:p-6">
        <label
          htmlFor="dta-search"
          className="mb-2 block text-sm font-semibold text-[var(--text-primary)]"
        >
          Número da DTA
        </label>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
                size={18}
                aria-hidden="true"
              />

              <input
                id="dta-search"
                type="text"
                value={dta}
                onChange={(event) => {
                  setDta(event.target.value);
                  setError(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Ex.: 25/0004821-7"
                aria-label="Número da DTA"
                className={`h-12 w-full rounded-xl border bg-[var(--primary-light)]/35 pl-12 pr-12 text-base font-medium text-[var(--text-primary)] outline-none transition placeholder:font-normal placeholder:text-[var(--text-muted)] focus:bg-white focus:ring-2 focus:ring-blue-100 ${
                  error
                    ? "border-[var(--error)] focus:border-[var(--error)]"
                    : "border-blue-100 focus:border-[var(--primary)]"
                }`}
              />

              {dta && (
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={isLoading}
                  aria-label="Limpar DTA"
                  className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/80 text-slate-500 transition hover:bg-white hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Exemplo */}
            {!error && (
              <p className="mt-2 text-xs text-[var(--text-secondary)]">
                Exemplo: 25/0004821-7
              </p>
            )}

            {/* Erro */}
            {error && (
              <div className="mt-3">
                <FeedbackMessage
                  variant="error"
                  message={error}
                />
              </div>
            )}
          </div>

          {/* Botão */}
          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading || !dta.trim()}
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

                Consultar DTA
              </>
            )}
          </button>
        </div>

        {/* Sucesso */}
        {searchedDta && !isLoading && (
          <div
            role="status"
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-green-700"
          >
            <CheckCircle2
              size={18}
              className="text-green-600"
              aria-hidden="true"
            />

            DTA localizada
          </div>
        )}
      </div>
    </section>
  );
}
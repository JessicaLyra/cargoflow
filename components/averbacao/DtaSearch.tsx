"use client";

import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

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
      setError(result.error.issues[0]?.message ?? "DTA inválida.");
      onClearResult();
      return;
    }

    setError(null);
    setIsLoading(true);
    onClearResult();

    const operation = await getDtaOperation(result.data);

    setIsLoading(false);

    if (!operation) {
      setError("DTA não encontrada. Verifique o número informado.");
      return;
    }

    onSearch(operation);
  }

  function handleClear() {
    setDta("");
    setError(null);
    onClearResult();
  }

  return (
    <section className="rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex-1">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
              size={20}
            />

            <input
              type="text"
              value={dta}
              onChange={(event) => setDta(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSearch();
              }}
              placeholder="Informe a DTA. Ex.: 25/0004821-7"
              className={`h-12 w-full rounded-xl border bg-white pl-12 pr-12 text-base text-[var(--text-primary)] outline-none transition focus:ring-2 focus:ring-blue-100 ${
                error
                  ? "border-[var(--error)] focus:border-[var(--error)]"
                  : "border-[var(--border)] focus:border-[var(--primary)]"
              }`}
            />

            {dta && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Limpar DTA"
                className="absolute right-4 top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X size={16} />
              </button>
            )}
          </div>

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
          className="flex h-12 min-w-40 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              Consultando...
            </>
          ) : (
            "Consultar DTA"
          )}
        </button>

        {searchedDta && !isLoading && (
          <div className="flex h-12 items-center gap-2 whitespace-nowrap text-sm font-medium text-green-700">
            <CheckCircle2 size={20} className="text-green-600" />
            DTA localizada
          </div>
        )}
      </div>
    </section>
  );
}
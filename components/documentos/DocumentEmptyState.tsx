import { FileSearch } from "lucide-react";

export function DocumentEmptyState() {
  return (
    <section className="rounded-xl border border-dashed border-[var(--border)] bg-white px-6 py-12 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-blue-50 text-[var(--primary)]">
        <FileSearch size={22} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
        Nenhuma consulta realizada
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
        Informe uma DTA, DI ou DUIMP para localizar os documentos enviados e acompanhar a operação.
      </p>
    </section>
  );
}
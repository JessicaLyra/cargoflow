import {
  FileClock,
  FileText,
  Plane,
  Ship,
  Truck,
} from "lucide-react";

type QueueItem = {
  fileName: string;
  documentId: string;
  modal: "Marítimo" | "Aéreo" | "Rodoviário";
  progress: number;
  stage: string;
};

const queue: QueueItem[] = [
  {
    fileName: "BL_HKGH1234567.pdf",
    documentId: "AVG250521-0033",
    modal: "Marítimo",
    progress: 78,
    stage: "Validando documentos",
  },
  {
    fileName: "DANFE_4567.pdf",
    documentId: "AVG250521-0029",
    modal: "Aéreo",
    progress: 45,
    stage: "Processando averbação",
  },
  {
    fileName: "PACKING_LIST_8821.pdf",
    documentId: "AVG250521-0027",
    modal: "Rodoviário",
    progress: 26,
    stage: "Aguardando validação",
  },
];

function getModalConfig(modal: QueueItem["modal"]) {
  if (modal === "Aéreo") {
    return {
      icon: Plane,
      className:
        "bg-violet-50 text-violet-700 ring-violet-200",
    };
  }

  if (modal === "Rodoviário") {
    return {
      icon: Truck,
      className:
        "bg-orange-50 text-orange-700 ring-orange-200",
    };
  }

  return {
    icon: Ship,
    className:
      "bg-blue-50 text-blue-700 ring-blue-200",
  };
}

export function ProcessingQueue() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
      <div className="border-b border-[var(--border)] px-6 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
              Processamento
            </p>

            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              Fila atual
            </h3>

            <p className="mt-2 text-base leading-7 text-[var(--text-secondary)]">
              Arquivos sendo processados neste momento.
            </p>
          </div>

          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
            <FileClock
              size={22}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4 rounded-xl bg-[var(--surface-secondary)] px-4 py-4">
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">
              Em processamento
            </p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              {queue.length}
            </p>
          </div>

          <span className="rounded-full bg-[var(--primary-light)] px-3 py-1.5 text-sm font-semibold text-[var(--primary)]">
            Atualização em tempo real
          </span>
        </div>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {queue.map((item) => {
          const modal = getModalConfig(item.modal);
          const ModalIcon = modal.icon;

          return (
            <article
              key={item.fileName}
              className="group px-6 py-5 transition-colors hover:bg-[var(--surface-secondary)]/55"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[var(--primary)] shadow-sm">
                  <FileText
                    size={20}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-[var(--text-primary)]">
                        {item.fileName}
                      </p>

                      <p className="mt-1 font-mono text-sm font-medium text-[var(--primary)]">
                        {item.documentId}
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ring-1 ring-inset ${modal.className}`}
                    >
                      <ModalIcon
                        size={14}
                        aria-hidden="true"
                      />
                      {item.modal}
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-[var(--text-secondary)]">
                          {item.stage}
                        </p>
                      </div>

                      <span className="text-xl font-bold tracking-tight text-[var(--primary)]">
                        {item.progress}%
                      </span>
                    </div>

                    <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
                        style={{
                          width: `${item.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

    </section>
  );
}
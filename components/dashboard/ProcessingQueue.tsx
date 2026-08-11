import { AlertCircle, CheckCircle2, FileText } from "lucide-react";

type QueueStatus = "processing" | "success" | "error";

type QueueItem = {
  fileName: string;
  documentId: string;
  modal: string;
  progress: number;
  status: QueueStatus;
};

const queue: QueueItem[] = [
  {
    fileName: "BL_HKGH1234567.pdf",
    documentId: "AVG250521-0033",
    modal: "Marítimo",
    progress: 78,
    status: "processing",
  },
  {
    fileName: "FATURA_INV_7890.pdf",
    documentId: "AVG250521-0032",
    modal: "Aéreo",
    progress: 100,
    status: "success",
  },
  {
    fileName: "PACKING_LIST_5678.pdf",
    documentId: "AVG250521-0031",
    modal: "Marítimo",
    progress: 100,
    status: "success",
  },
  {
    fileName: "CERT_ORIGEM_123.pdf",
    documentId: "AVG250521-0030",
    modal: "Rodoviário",
    progress: 100,
    status: "error",
  },
  {
    fileName: "DANFE_4567.pdf",
    documentId: "AVG250521-0029",
    modal: "Aéreo",
    progress: 45,
    status: "processing",
  },
];

function getStatusStyles(status: QueueStatus) {
  if (status === "success") {
    return {
      label: "Concluído",
      badge: "border-green-200 bg-green-50 text-green-700",
      bar: "bg-green-500",
      icon: CheckCircle2,
      iconClass: "text-green-600",
    };
  }

  if (status === "error") {
    return {
      label: "Falha",
      badge: "border-red-200 bg-red-50 text-red-700",
      bar: "bg-red-500",
      icon: AlertCircle,
      iconClass: "text-red-600",
    };
  }

  return {
    label: "Em processamento",
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    bar: "bg-[var(--primary)]",
    icon: FileText,
    iconClass: "text-[var(--primary)]",
  };
}

export function ProcessingQueue() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
      <div className="border-b border-[var(--border)] px-6 py-5">
        <p className="text-sm font-medium text-[var(--primary)]">
          Processamento
        </p>

        <div className="mt-1 flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-[var(--text-primary)]">
            Fila atual
          </h3>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-[var(--primary)]">
            {queue.length} arquivos
          </span>
        </div>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {queue.map((item) => {
          const styles = getStatusStyles(item.status);
          const StatusIcon = styles.icon;

          return (
            <article key={item.fileName} className="px-6 py-5">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-slate-50">
                  <StatusIcon
                    size={18}
                    strokeWidth={1.8}
                    className={styles.iconClass}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                        {item.fileName}
                      </p>

                      <p className="mt-1 text-xs text-[var(--text-secondary)]">
                        {item.documentId} · {item.modal}
                      </p>
                    </div>

                    <span
                      className={`w-fit shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium ${styles.badge}`}
                    >
                      {styles.label}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${styles.bar}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>

                    <span className="w-10 text-right text-xs font-medium text-[var(--text-secondary)]">
                      {item.progress}%
                    </span>
                  </div>

                  {item.status === "error" && (
                    <button
                      type="button"
                      className="mt-3 cursor-pointer text-sm font-medium text-red-600 transition-opacity hover:opacity-70"
                    >
                      Ver erro
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="border-t border-[var(--border)] px-6 py-4">
        <button
          type="button"
          className="cursor-pointer text-sm font-medium text-[var(--primary)] transition-opacity hover:opacity-70"
        >
          Ver fila completa →
        </button>
      </div>
    </section>
  );
}
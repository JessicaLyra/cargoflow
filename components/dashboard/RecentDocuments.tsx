import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  LoaderCircle,
  Plane,
  Ship,
  Truck,
} from "lucide-react";

const activities = [
  {
    time: "09:41",
    id: "AVG250521-0032",
    process: "DUIMP",
    event: "Averbação concluída",
    importer: "Atlas Comércio Exterior",
    modal: "Marítimo",
    modalIcon: Ship,
    icon: CheckCircle2,
    iconClass:
      "bg-[var(--success-light)] text-[var(--success)] ring-[var(--success)]/20",
    statusClass:
      "bg-[var(--success-light)] text-[var(--success-dark)]",
    statusLabel: "Concluído",
  },
  {
    time: "09:38",
    id: "AVG250521-0031",
    process: "DI",
    event: "Documentos anexados",
    importer: "NorteSul Importações",
    modal: "Aéreo",
    modalIcon: Plane,
    icon: FileCheck2,
    iconClass:
      "bg-[var(--primary-light)] text-[var(--primary)] ring-[var(--primary)]/20",
    statusClass:
      "bg-[var(--primary-light)] text-[var(--primary)]",
    statusLabel: "Atualizado",
  },
  {
    time: "09:34",
    id: "AVG250521-0030",
    process: "DUIMP",
    event: "Processamento iniciado",
    importer: "Mercosul Trading",
    modal: "Rodoviário",
    modalIcon: Truck,
    icon: LoaderCircle,
    iconClass:
      "bg-[var(--warning-light)] text-[var(--warning)] ring-[var(--warning)]/20",
    statusClass:
      "bg-[var(--warning-light)] text-[var(--warning-dark)]",
    statusLabel: "Processando",
  },
  {
    time: "09:28",
    id: "AVG250521-0029",
    process: "DI",
    event: "Falha no processamento",
    importer: "Oceânica Import",
    modal: "Aéreo",
    modalIcon: Plane,
    icon: AlertTriangle,
    iconClass:
      "bg-[var(--error-light)] text-[var(--error)] ring-[var(--error)]/20",
    statusClass:
      "bg-[var(--error-light)] text-[var(--error-dark)]",
    statusLabel: "Falha",
  },
];

export function RecentDocuments() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[var(--border)] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
            Atividade recente
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Últimas movimentações
          </h3>
        </div>

      </div>

      <div className="divide-y divide-[var(--border)]">
        {activities.map((activity) => {
          const ActivityIcon = activity.icon;
          const ModalIcon = activity.modalIcon;

          return (
            <article
              key={activity.id}
              className="group relative grid gap-4 px-6 py-5 transition-colors hover:bg-[var(--surface-secondary)]/60 lg:grid-cols-[72px_minmax(0,1.4fr)_minmax(0,1fr)_auto] lg:items-center"
            >
              {/* Horário */}
              <div>
                <p className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
                  {activity.time}
                </p>

                <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">
                  hoje
                </p>
              </div>

              {/* Evento principal */}
              <div className="flex min-w-0 items-start gap-4">
                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${activity.iconClass}`}
                >
                  <ActivityIcon
                    size={20}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-base font-semibold text-[var(--text-primary)]">
                      {activity.event}
                    </p>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${activity.statusClass}`}
                    >
                      {activity.statusLabel}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-sm font-semibold text-[var(--primary)]">
                      {activity.id}
                    </span>

                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                      {activity.process}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contexto da operação */}
              <div className="min-w-0">
                <p className="truncate text-base font-medium text-[var(--text-primary)]">
                  {activity.importer}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <ModalIcon
                    size={17}
                    className="text-[var(--primary)]"
                    aria-hidden="true"
                  />

                  <span className="text-sm font-medium text-[var(--text-secondary)]">
                    {activity.modal}
                  </span>
                </div>
              </div>

              {/* Indicador visual */}
              <div className="hidden justify-end lg:flex">
                <ArrowRight
                  size={18}
                  className="text-[var(--text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--primary)]"
                  aria-hidden="true"
                />
              </div>
            </article>
          );
        })}
      </div>

      <div className="border-t border-[var(--border)] bg-[var(--surface-secondary)]/35 px-6 py-4">
        <p className="text-sm text-[var(--text-secondary)]">
          Exibindo as últimas movimentações registradas no sistema.
        </p>
      </div>
    </section>
  );
}
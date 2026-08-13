import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Inbox,
  MoveRight,
} from "lucide-react";

const flowItems = [
  {
    label: "Recebidos",
    value: 48,
    icon: Inbox,
    cardClass:
      "border-blue-200 bg-gradient-to-br from-blue-50 via-white to-white",
    iconClass:
      "bg-blue-100 text-blue-700 ring-blue-200",
    numberClass: "text-blue-700",
    accentClass: "bg-blue-500",
  },
  {
    label: "Em processamento",
    value: 7,
    icon: Clock3,
    cardClass:
      "border-amber-200 bg-gradient-to-br from-amber-50 via-white to-white",
    iconClass:
      "bg-amber-100 text-amber-700 ring-amber-200",
    numberClass: "text-amber-700",
    accentClass: "bg-amber-500",
  },
  {
    label: "Concluídos",
    value: 39,
    icon: CheckCircle2,
    cardClass:
      "border-green-200 bg-gradient-to-br from-green-50 via-white to-white",
    iconClass:
      "bg-green-100 text-green-700 ring-green-200",
    numberClass: "text-green-700",
    accentClass: "bg-green-500",
  },
];

export function DocumentFlow() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[var(--border)] px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
            Fluxo operacional
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Situação das operações
          </h3>
        </div>

      </div>

      <div className="grid gap-5 px-6 py-7 lg:px-8 xl:grid-cols-[1fr_auto_1fr_auto_1fr] xl:items-center">
        {flowItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="contents">
              <article
                className={`group relative overflow-hidden rounded-2xl border p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${item.cardClass}`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 ${item.accentClass}`}
                />

                <div className="flex items-center justify-between gap-5">
                  <div
                    className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset ${item.iconClass}`}
                  >
                    <Icon
                      size={26}
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    Hoje
                  </span>
                </div>

                <div className="mt-6">
                  <p className="text-lg font-semibold text-[var(--text-primary)]">
                    {item.label}
                  </p>

                  <div className="mt-2 flex items-end gap-3">
                    <strong
                      className={`text-6xl font-bold leading-none tracking-[-0.055em] ${item.numberClass}`}
                    >
                      {item.value}
                    </strong>

                    <span className="pb-1 text-sm font-medium text-[var(--text-secondary)]">
                      operações
                    </span>
                  </div>
                </div>
              </article>

              {index < flowItems.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden items-center justify-center xl:flex"
                >
                  <div className="flex items-center">
                    <div className="h-px w-10 bg-[var(--border-strong)]" />

                    <MoveRight
                      size={22}
                      className="-ml-1 text-[var(--text-muted)]"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-[var(--border)] bg-[var(--error-light)]/45 px-6 py-5 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--error-light)] text-[var(--error)] ring-1 ring-inset ring-red-200">
              <AlertTriangle
                size={22}
                aria-hidden="true"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  Falhas
                </p>

                <span className="rounded-full bg-[var(--error-light)] px-3 py-1 text-sm font-semibold text-[var(--error-dark)]">
                  Requer atenção
                </span>
              </div>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Operações que precisam de revisão.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <strong className="text-4xl font-bold tracking-tight text-[var(--error)]">
              2
            </strong>

          </div>
        </div>
      </div>
    </section>
  );
}
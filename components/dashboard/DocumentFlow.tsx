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
    change: "12%",
    direction: "up",
    icon: Inbox,
    iconClass: "border-blue-200 text-blue-600",
    changeClass: "text-green-600",
  },
  {
    label: "Em processamento",
    value: 7,
    change: "22%",
    direction: "down",
    icon: Clock3,
    iconClass: "border-blue-300 border-dashed text-blue-600",
    changeClass: "text-amber-600",
  },
  {
    label: "Concluídos",
    value: 39,
    change: "18%",
    direction: "up",
    icon: CheckCircle2,
    iconClass: "border-green-200 text-green-600",
    changeClass: "text-green-600",
  },
];

export function DocumentFlow() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8">
      <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--primary)]">
            Fluxo documental
          </p>

          <h3 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">
            Andamento das operações
          </h3>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Acompanhe o processamento dos documentos enviados.
          </p>
        </div>

        <button
          type="button"
          className="cursor-pointer text-sm font-medium text-[var(--primary)] transition-opacity hover:opacity-70"
        >
          Ver detalhes do fluxo
        </button>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_auto_1fr_auto_1fr_auto_0.85fr] xl:items-center">
        {flowItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="contents">
              <div className="flex items-center gap-5">
                <div
                  className={`flex size-20 shrink-0 items-center justify-center rounded-full border bg-white ${item.iconClass}`}
                >
                  <Icon size={32} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    {item.label}
                  </p>

                  <p className="mt-1 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
                    {item.value}
                  </p>

                  <p className={`mt-2 text-sm font-medium ${item.changeClass}`}>
                    {item.direction === "up" ? "↑" : "↓"} {item.change}
                    <span className="ml-1 font-normal text-[var(--text-secondary)]">
                      vs ontem
                    </span>
                  </p>
                </div>
              </div>

              {index < flowItems.length - 1 && (
                <div className="hidden items-center xl:flex">
                  <div className="h-px w-16 bg-blue-200" />
                  <MoveRight className="-ml-1 text-[var(--primary)]" size={24} />
                </div>
              )}
            </div>
          );
        })}

        <div className="border-t border-[var(--border)] pt-6 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
          <div className="flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full border border-dashed border-red-300 text-red-600">
              <AlertTriangle size={26} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--text-secondary)]">
                Falhas
              </p>

              <p className="mt-1 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                2
              </p>

              <p className="mt-2 text-sm font-medium text-red-600">
                ↓ 33%
                <span className="ml-1 font-normal text-[var(--text-secondary)]">
                  vs ontem
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 cursor-pointer text-sm font-medium text-[var(--primary)] hover:underline"
          >
            Ver falhas
          </button>
        </div>
      </div>
    </section>
  );
}
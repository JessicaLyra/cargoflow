import { LucideIcon } from "lucide-react";

type ModalCardProps = {
  title: string;
  value: number;
  change: number;
  processing: number;
  icon: LucideIcon;
  trend?: "up" | "down";
};

export function ModalCard({
  title,
  value,
  change,
  processing,
  icon: Icon,
  trend = "up",
}: ModalCardProps) {
  const isPositive = trend === "up";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-blue-200">
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full border border-blue-100" />

      <div className="relative flex items-start justify-between gap-6">
        <div className="flex min-w-0 items-center gap-5">
          <div className="relative flex size-16 shrink-0 items-center justify-center">
            <div className="absolute inset-0 rounded-2xl border border-blue-100 bg-blue-50/60 transition-transform duration-300 group-hover:rotate-3" />

            <Icon
              size={30}
              strokeWidth={1.65}
              className="relative z-10 text-[var(--primary)]"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">
              {title}
            </p>

            <p className="mt-1 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
              {value}
            </p>
          </div>
        </div>

        <span className="text-2xl text-slate-300 transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>

      <div className="relative mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
        <p
          className={`text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "↑" : "↓"} {Math.abs(change)}%
          <span className="ml-1 font-normal text-[var(--text-secondary)]">
            vs ontem
          </span>
        </p>

        <div className="hidden h-4 w-px bg-[var(--border)] sm:block" />

        <p className="text-sm text-[var(--text-secondary)]">
          <span className="font-semibold text-[var(--primary)]">
            {processing}
          </span>{" "}
          em processamento
        </p>
      </div>

      <div className="relative mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--border)]" />

        <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
          modal
        </span>
      </div>
    </article>
  );
}
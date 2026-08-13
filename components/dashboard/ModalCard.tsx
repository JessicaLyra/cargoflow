import {
  ArrowDownRight,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";

type ModalTone = "maritime" | "air" | "road";

type ModalCardProps = {
  title: string;
  value: number;
  change: number;
  icon: LucideIcon;
  trend?: "up" | "down";
  tone?: ModalTone;
};

const toneConfig = {
  maritime: {
    backgroundImage:
      "/images/modals/modal-maritimo.jpg",
    fallback:
      "bg-gradient-to-br from-[#0B2A4A] via-[#0D3B66] to-[#166094]",
    icon:
      "border-cyan-200/25 bg-cyan-200/10 text-cyan-50",
  },

  air: {
    backgroundImage:
      "/images/modals/modal-aviao.jpg",
    fallback:
      "bg-gradient-to-br from-[#062B66] via-[#0755AE] to-[#1469D4]",
    icon:
      "border-blue-200/25 bg-blue-200/10 text-blue-50",
  },

  road: {
    backgroundImage:
      "/images/modals/modal-rodoviario.jpg",
    fallback:
      "bg-gradient-to-br from-[#9A3412] via-[#C2410C] to-[#F06418]",
    icon:
      "border-orange-200/25 bg-orange-200/10 text-orange-50",
  },
};

export function ModalCard({
  title,
  value,
  change,
  icon: Icon,
  trend = "up",
  tone = "maritime",
}: ModalCardProps) {
  const config = toneConfig[tone];
  const isPositive = trend === "up";

  const TrendIcon = isPositive
    ? ArrowUpRight
    : ArrowDownRight;

  return (
    <article
      className={`group relative min-h-[230px] overflow-hidden rounded-2xl border border-white/10 bg-cover bg-center text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${config.fallback}`}
      style={{
        backgroundImage: `url("${config.backgroundImage}")`,
      }}
    >
      {/* Overlay para garantir leitura dos textos */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent"
      />

      {/* Escurecimento inferior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent"
      />

      <div className="relative z-10 flex min-h-[230px] flex-col p-6">
        {/* Nome + ícone */}
        <div className="flex items-start justify-between gap-5">
          <h3 className="text-xl font-bold uppercase tracking-[0.08em] text-white sm:text-2xl">
            {title}
          </h3>

          <div
            className={`flex size-12 shrink-0 items-center justify-center rounded-xl border backdrop-blur-md transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 ${config.icon}`}
          >
            <Icon
              size={25}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Total */}
        <div className="mt-5">
          <strong className="block text-6xl font-bold leading-none tracking-[-0.06em] text-white">
            {value}
          </strong>

          <p className="mt-2 text-base font-medium text-white/90">
            operações
          </p>
        </div>

        {/* Comparação */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold backdrop-blur-md ${
                isPositive
                  ? "bg-emerald-400/20 text-emerald-50"
                  : "bg-red-500/20 text-red-50"
              }`}
            >
              <TrendIcon
                size={16}
                aria-hidden="true"
              />

              {Math.abs(change)}%
            </span>

            <p className="mt-2 text-sm font-medium text-white/70">
              vs ontem
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
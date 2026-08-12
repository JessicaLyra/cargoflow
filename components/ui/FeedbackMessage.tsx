import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
} from "lucide-react";

type FeedbackVariant =
  | "success"
  | "error"
  | "warning"
  | "info";

type FeedbackMessageProps = {
  variant: FeedbackVariant;
  title?: string;
  message: string;
};

const variants = {
  success: {
    icon: CheckCircle2,
    container:
      "border-green-200 bg-green-50 text-green-800",
    iconClass: "text-green-600",
  },

  error: {
    icon: AlertCircle,
    container:
      "border-red-200 bg-red-50 text-red-800",
    iconClass: "text-red-600",
  },

  warning: {
    icon: TriangleAlert,
    container:
      "border-amber-200 bg-amber-50 text-amber-800",
    iconClass: "text-amber-600",
  },

  info: {
    icon: Info,
    container:
      "border-blue-200 bg-blue-50 text-blue-900",
    iconClass: "text-[var(--primary)]",
  },
};

export function FeedbackMessage({
  variant,
  title,
  message,
}: FeedbackMessageProps) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`flex gap-3 rounded-lg border px-4 py-3 text-sm ${config.container}`}
    >
      <Icon
        size={18}
        className={`mt-0.5 shrink-0 ${config.iconClass}`}
      />

      <div>
        {title && (
          <p className="font-medium">
            {title}
          </p>
        )}

        <p className={title ? "mt-1 leading-6" : "leading-6"}>
          {message}
        </p>
      </div>
    </div>
  );
}
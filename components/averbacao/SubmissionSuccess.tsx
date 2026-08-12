"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Plus,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";

type ProcessingStatus = "processing" | "success" | "error";

type SubmissionSuccessProps = {
  protocol: string;
  onNewSubmission: () => void;
};

export function SubmissionSuccess({
  protocol,
  onNewSubmission,
}: SubmissionSuccessProps) {
  const [status, setStatus] = useState<ProcessingStatus>("processing");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const lastDigit = Number(protocol.slice(-1));

      setStatus(lastDigit % 2 === 0 ? "success" : "error");
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [protocol]);

  const statusContent = {
    processing: {
      icon: Clock3,
      title: "Em processamento",
      description:
        "Os documentos foram recebidos e estão sendo processados.",
      containerClass: "border-amber-200 bg-amber-50",
      iconClass: "bg-amber-100 text-amber-700",
      textClass: "text-amber-800",
    },

    success: {
      icon: CheckCircle2,
      title: "Processamento concluído",
      description:
        "A averbação foi processada e concluída com sucesso.",
      containerClass: "border-green-200 bg-green-50",
      iconClass: "bg-green-100 text-green-700",
      textClass: "text-green-800",
    },

    error: {
      icon: AlertCircle,
      title: "Falha no processamento",
      description:
        "Não foi possível concluir o processamento desta averbação.",
      containerClass: "border-red-200 bg-red-50",
      iconClass: "bg-red-100 text-red-700",
      textClass: "text-red-800",
    },
  };

  const currentStatus = statusContent[status];
  const StatusIcon = currentStatus.icon;

  return (
    <section className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">
      <div className="border-b border-[var(--border)] px-6 py-5 lg:px-8">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <p className="text-sm font-medium text-green-700">
              Averbação recebida
            </p>

            <h3 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">
              Documentos enviados com sucesso
            </h3>

            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              A operação foi registrada e seguirá para processamento.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6 lg:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--border)] bg-slate-50/60 p-5">
            <p className="text-sm text-[var(--text-secondary)]">
              Protocolo
            </p>

            <p className="mt-2 font-mono text-base font-semibold text-[var(--text-primary)]">
              {protocol}
            </p>
          </div>

          <div className={`rounded-xl border p-5 transition-colors ${currentStatus.containerClass}`}>
            <div className="flex items-start gap-3">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${currentStatus.iconClass}`}>
                <StatusIcon
                  size={19}
                  className={status === "processing" ? "animate-pulse" : ""}
                />
              </div>

              <div>
                <p className={`text-sm font-semibold ${currentStatus.textClass}`}>
                  {currentStatus.title}
                </p>

                <p className={`mt-1 text-sm leading-6 ${currentStatus.textClass} opacity-80`}>
                  {currentStatus.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {status === "processing" && (
          <div className="overflow-hidden rounded-full bg-slate-100">
            <div className="h-1.5 w-2/3 animate-pulse rounded-full bg-[var(--primary)]" />
          </div>
        )}

        {status === "error" && (
          <div className="flex gap-3 rounded-lg border border-red-100 bg-red-50/60 px-4 py-3 text-sm text-red-800">
            <RotateCcw size={18} className="mt-0.5 shrink-0" />

            <p className="leading-6">
              Verifique os dados e documentos da operação antes de realizar uma nova tentativa.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--text-secondary)]">
            Você pode iniciar outra averbação sem aguardar a conclusão desta.
          </p>

          <Button type="button" onClick={onNewSubmission} className="gap-2">
            <Plus size={18} />
            Nova averbação
          </Button>
        </div>
      </div>
    </section>
  );
}
"use client";

import {
  AlertCircle,
  Check,
  FileText,
  Info,
  LoaderCircle,
  Send,
  UploadCloud,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { submitAverbacao } from "@/lib/api/averbacao";
import {
  averbacaoSchema,
  type AverbacaoFormData,
} from "@/lib/validations/averbacao";

type AverbacaoFormProps = {
  onSuccess: (protocol: string) => void;
};

export function AverbacaoForm({
  onSuccess,
}: AverbacaoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<AverbacaoFormData>({
    resolver: zodResolver(averbacaoSchema),
    defaultValues: {
      processType: "DUIMP",
      broker: "",
      referenceCode: "",
      exchangeCoverage: "no",
      accessKey: "",
      pdfFile: null,
      xmlFile: null,
    },
  });

  const processType = useWatch({
    control,
    name: "processType",
  });

  const pdfFile = useWatch({
    control,
    name: "pdfFile",
  });

  const xmlFile = useWatch({
    control,
    name: "xmlFile",
  });

  const exchangeCoverage = useWatch({
    control,
    name: "exchangeCoverage",
  });

  const isDuimp = processType === "DUIMP";

  async function onSubmit(data: AverbacaoFormData) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await submitAverbacao(data);

      console.log("Averbação enviada:", response);

      onSuccess(response.protocol);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a averbação.";

      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">
      <div className="border-b border-[var(--border)] px-6 py-5 lg:px-8">
        <p className="text-sm font-medium text-[var(--primary)]">
          Dados do processo
        </p>

        <h3 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">
          Informações para averbação
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8 p-6 lg:p-8">
          {/* Tipo de processo */}
          <div>
            <p className="mb-3 text-sm font-medium text-[var(--text-primary)]">
              Tipo de processo
            </p>

            <div className="grid overflow-hidden rounded-lg border border-[var(--border)] sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  setValue("processType", "DUIMP", {
                    shouldValidate: true,
                  })
                }
                className={`flex h-11 cursor-pointer items-center justify-center gap-2 text-sm font-medium transition ${
                  processType === "DUIMP"
                    ? "bg-[var(--primary)] text-white"
                    : "bg-white text-[var(--text-secondary)] hover:bg-slate-50"
                }`}
              >
                <FileText size={17} />
                DUIMP
              </button>

              <button
                type="button"
                onClick={() =>
                  setValue("processType", "DI", {
                    shouldValidate: true,
                  })
                }
                className={`flex h-11 cursor-pointer items-center justify-center gap-2 border-t border-[var(--border)] text-sm font-medium transition sm:border-l sm:border-t-0 ${
                  processType === "DI"
                    ? "bg-[var(--primary)] text-white"
                    : "bg-white text-[var(--text-secondary)] hover:bg-slate-50"
                }`}
              >
                <FileText size={17} />
                DI
              </button>
            </div>

            {errors.processType && (
              <p className="mt-2 text-sm text-[var(--error)]">
                {errors.processType.message}
              </p>
            )}
          </div>

          {/* Comissária e referência */}
          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <label
                htmlFor="broker"
                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
              >
                Comissária{" "}
                <span className="text-red-500">*</span>
              </label>

              <select
                id="broker"
                {...register("broker")}
                className={`h-11 w-full cursor-pointer rounded-lg border bg-white px-3 text-sm text-[var(--text-primary)] outline-none transition-colors focus:ring-2 focus:ring-blue-100 ${
                  errors.broker
                    ? "border-[var(--error)] focus:border-[var(--error)]"
                    : "border-[var(--border)] focus:border-[var(--primary)]"
                }`}
              >
                <option value="">
                  Selecione uma comissária
                </option>

                <option value="cargo">
                  CargoFlow Despachos Aduaneiros Ltda.
                </option>

                <option value="atlas">
                  Atlas Comissária
                </option>

                <option value="global">
                  Global Trade Services
                </option>
              </select>

              {errors.broker && (
                <p className="mt-2 text-sm text-[var(--error)]">
                  {errors.broker.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="referenceCode"
                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
              >
                Código de referência{" "}
                <span className="font-normal text-[var(--text-secondary)]">
                  (opcional)
                </span>
              </label>

              <input
                id="referenceCode"
                type="text"
                {...register("referenceCode")}
                placeholder="Ex.: REF-2026-0001"
                className="h-11 w-full rounded-lg border border-[var(--border)] bg-white px-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-slate-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Cobertura cambial */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Cobertura cambial{" "}
                <span className="text-red-500">*</span>
              </p>

              <Info
                size={15}
                className="text-[var(--text-secondary)]"
              />
            </div>

            <div className="grid max-w-md grid-cols-2 overflow-hidden rounded-lg border border-[var(--border)]">
              <button
                type="button"
                onClick={() =>
                  setValue("exchangeCoverage", "no", {
                    shouldValidate: true,
                  })
                }
                className={`h-10 cursor-pointer text-sm font-medium transition ${
                  exchangeCoverage === "no"
                    ? "bg-blue-50 text-[var(--primary)] ring-1 ring-inset ring-[var(--primary)]"
                    : "text-[var(--text-secondary)] hover:bg-slate-50"
                }`}
              >
                Não
              </button>

              <button
                type="button"
                onClick={() =>
                  setValue("exchangeCoverage", "yes", {
                    shouldValidate: true,
                  })
                }
                className={`h-10 cursor-pointer border-l border-[var(--border)] text-sm font-medium transition ${
                  exchangeCoverage === "yes"
                    ? "bg-blue-50 text-[var(--primary)] ring-1 ring-inset ring-[var(--primary)]"
                    : "text-[var(--text-secondary)] hover:bg-slate-50"
                }`}
              >
                Sim
              </button>
            </div>

            {errors.exchangeCoverage && (
              <p className="mt-2 text-sm text-[var(--error)]">
                {errors.exchangeCoverage.message}
              </p>
            )}
          </div>

          <div className="h-px bg-[var(--border)]" />

          {/* Arquivos */}
          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-base font-semibold text-[var(--text-primary)]">
                  Arquivos obrigatórios
                </h4>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Envie os documentos exigidos para{" "}
                  {processType}.
                </p>
              </div>

              <p className="text-sm text-[var(--text-secondary)]">
                Formatos aceitos conforme o tipo de documento
              </p>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <UploadArea
                title={
                  isDuimp ? "PDF da DUIMP" : "PDF da DI"
                }
                description="Arquivo obrigatório em formato PDF"
                accept=".pdf"
                file={pdfFile}
                error={errors.pdfFile?.message}
                onChange={(file) =>
                  setValue("pdfFile", file, {
                    shouldValidate: true,
                  })
                }
              />

              {isDuimp ? (
                <div
                  className={`rounded-xl border border-dashed bg-slate-50/40 p-5 ${
                    errors.accessKey
                      ? "border-[var(--error)]"
                      : "border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      Chave de acesso
                    </p>

                    <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                      Obrigatório
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Informe a chave correspondente à DUIMP.
                  </p>

                  <input
                    type="text"
                    {...register("accessKey")}
                    placeholder="Digite a chave de acesso"
                    className={`mt-5 h-11 w-full rounded-lg border bg-white px-3 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-blue-100 ${
                      errors.accessKey
                        ? "border-[var(--error)] focus:border-[var(--error)]"
                        : "border-[var(--border)] focus:border-[var(--primary)]"
                    }`}
                  />

                  {errors.accessKey && (
                    <p className="mt-2 text-sm text-[var(--error)]">
                      {errors.accessKey.message}
                    </p>
                  )}
                </div>
              ) : (
                <UploadArea
                  title="Arquivo XML"
                  description="XML vinculado à Declaração de Importação"
                  accept=".xml"
                  file={xmlFile}
                  error={errors.xmlFile?.message}
                  onChange={(file) =>
                    setValue("xmlFile", file, {
                      shouldValidate: true,
                    })
                  }
                />
              )}
            </div>
          </div>

          {/* Informação sobre processamento */}
          <div className="flex gap-3 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-900">
            <Info
              size={18}
              className="mt-0.5 shrink-0 text-[var(--primary)]"
            />

            <p className="leading-6">
              Após o envio, o processamento será realizado de
              forma independente. Você poderá iniciar novas
              averbações enquanto esta operação estiver em
              andamento.
            </p>
          </div>

          {/* Erro retornado pela API */}
          {submitError && (
            <div
              role="alert"
              className="flex gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0 text-red-600"
              />

              <div>
                <p className="font-medium">
                  Não foi possível enviar a averbação
                </p>

                <p className="mt-1 leading-6">
                  {submitError}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="flex flex-col-reverse gap-3 border-t border-[var(--border)] bg-slate-50/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Button type="button" variant="secondary">
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
                Enviando...
              </>
            ) : (
              <>
                <Send size={18} />
                Enviar para averbação
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}

type UploadAreaProps = {
  title: string;
  description: string;
  accept: string;
  file: File | null;
  error?: string;
  onChange: (file: File | null) => void;
};

function UploadArea({
  title,
  description,
  accept,
  file,
  error,
  onChange,
}: UploadAreaProps) {
  if (file) {
    return (
      <div
        className={`rounded-xl border bg-white p-5 ${
          error
            ? "border-[var(--error)]"
            : "border-[var(--border)]"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <FileText size={19} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                {file.name}
              </p>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remover arquivo"
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-green-700">
          <Check size={17} />
          Arquivo selecionado
        </div>

        {error && (
          <p className="mt-2 text-sm text-[var(--error)]">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <label
        className={`flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-slate-50/40 p-6 text-center transition hover:border-[var(--primary)] hover:bg-blue-50/40 ${
          error
            ? "border-[var(--error)]"
            : "border-slate-300"
        }`}
      >
        <input
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(event) =>
            onChange(event.target.files?.[0] ?? null)
          }
        />

        <div className="flex size-11 items-center justify-center rounded-full bg-blue-50 text-[var(--primary)]">
          <UploadCloud size={21} />
        </div>

        <p className="mt-4 text-sm font-medium text-[var(--text-primary)]">
          {title} <span className="text-red-500">*</span>
        </p>

        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          {description}
        </p>

        <span className="mt-4 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-[var(--text-primary)]">
          Selecionar arquivo
        </span>
      </label>

      {error && (
        <p className="mt-2 text-sm text-[var(--error)]">
          {error}
        </p>
      )}
    </div>
  );
}
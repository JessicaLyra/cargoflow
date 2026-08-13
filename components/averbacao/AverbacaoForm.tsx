"use client";

import {
  Check,
  FileText,
  Info,
  KeyRound,
  LoaderCircle,
  Send,
  UploadCloud,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { FeedbackMessage } from "@/components/ui/FeedbackMessage";
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
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
      {/* Cabeçalho */}
      <div className="border-b border-[var(--border)] px-6 py-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
          Dados do processo
        </p>

        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          Informações para averbação
        </h3>

        <p className="mt-2 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
          Defina o tipo de processo e envie os documentos necessários para
          iniciar a averbação.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8 p-6 lg:p-8">
          {/* Tipo de processo */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-[var(--text-primary)]">
                  Tipo de processo
                </p>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Selecione o documento que será utilizado na operação.
                </p>
              </div>
            </div>

            <div className="grid overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-1 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  setValue("processType", "DUIMP", {
                    shouldValidate: true,
                  })
                }
                aria-pressed={processType === "DUIMP"}
                className={`flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
                  processType === "DUIMP"
                    ? "bg-[var(--primary)] text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:bg-white hover:text-[var(--text-primary)]"
                }`}
              >
                <FileText size={18} aria-hidden="true" />
                DUIMP
              </button>

              <button
                type="button"
                onClick={() =>
                  setValue("processType", "DI", {
                    shouldValidate: true,
                  })
                }
                aria-pressed={processType === "DI"}
                className={`flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
                  processType === "DI"
                    ? "bg-[var(--primary)] text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:bg-white hover:text-[var(--text-primary)]"
                }`}
              >
                <FileText size={18} aria-hidden="true" />
                DI
              </button>
            </div>

            {errors.processType && (
              <p className="mt-2 text-sm text-[var(--error)]">
                {errors.processType.message}
              </p>
            )}
          </div>

          {/* Dados principais */}
          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <label
                htmlFor="broker"
                className="mb-2 block text-sm font-semibold text-[var(--text-primary)]"
              >
                Comissária <span className="text-[var(--error)]">*</span>
              </label>

              <select
                id="broker"
                {...register("broker")}
                className={`h-12 w-full cursor-pointer rounded-xl border bg-white px-4 text-sm text-[var(--text-primary)] outline-none transition focus:ring-2 focus:ring-blue-100 ${
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
                className="mb-2 block text-sm font-semibold text-[var(--text-primary)]"
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
                className="h-12 w-full rounded-xl border border-[var(--border)] bg-white px-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Cobertura cambial */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div>
                <p className="text-base font-semibold text-[var(--text-primary)]">
                  Cobertura cambial{" "}
                  <span className="text-[var(--error)]">*</span>
                </p>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Informe se a operação possui cobertura cambial.
                </p>
              </div>

              <Info
                size={16}
                aria-hidden="true"
                className="text-[var(--text-secondary)]"
              />
            </div>

            <div className="grid max-w-md grid-cols-2 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-1">
              <button
                type="button"
                onClick={() =>
                  setValue("exchangeCoverage", "no", {
                    shouldValidate: true,
                  })
                }
                aria-pressed={exchangeCoverage === "no"}
                className={`h-11 cursor-pointer rounded-lg text-sm font-semibold transition ${
                  exchangeCoverage === "no"
                    ? "bg-white text-[var(--primary)] shadow-sm ring-1 ring-inset ring-[var(--primary)]/20"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
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
                aria-pressed={exchangeCoverage === "yes"}
                className={`h-11 cursor-pointer rounded-lg text-sm font-semibold transition ${
                  exchangeCoverage === "yes"
                    ? "bg-white text-[var(--primary)] shadow-sm ring-1 ring-inset ring-[var(--primary)]/20"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
                  Documentação
                </p>

                <h4 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">
                  Arquivos obrigatórios
                </h4>

                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  Envie os documentos exigidos para {processType}.
                </p>
              </div>

              <p className="text-sm font-medium text-[var(--text-secondary)]">
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
                  className={`rounded-2xl border bg-[var(--surface-secondary)]/45 p-5 ${
                    errors.accessKey
                      ? "border-[var(--error)]"
                      : "border-[var(--border)]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                      <KeyRound size={20} aria-hidden="true" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-base font-semibold text-[var(--text-primary)]">
                          Chave de acesso
                        </p>

                        <span className="rounded-full bg-[var(--error-light)] px-2.5 py-1 text-xs font-semibold text-[var(--error)]">
                          Obrigatório
                        </span>
                      </div>

                      <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                        Informe a chave correspondente à DUIMP.
                      </p>
                    </div>
                  </div>

                  <input
                    type="text"
                    {...register("accessKey")}
                    placeholder="Digite a chave de acesso"
                    className={`mt-5 h-12 w-full rounded-xl border bg-white px-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-blue-100 ${
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
          <FeedbackMessage
            variant="info"
            message="Após o envio, o processamento será realizado de forma independente. Você poderá iniciar novas averbações enquanto esta operação estiver em andamento."
          />

          {/* Erro retornado pela API */}
          {submitError && (
            <FeedbackMessage
              variant="error"
              title="Não foi possível enviar a averbação"
              message={submitError}
            />
          )}
        </div>

        {/* Ações */}
        <div className="flex flex-col-reverse gap-3 border-t border-[var(--border)] bg-[var(--surface-secondary)]/55 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Button
            type="button"
            variant="secondary"
            className="h-12 px-5"
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="action"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="h-12 gap-2 px-6 text-base font-semibold"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                  aria-hidden="true"
                />
                Enviando...
              </>
            ) : (
              <>
                <Send size={18} aria-hidden="true" />
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
        className={`rounded-2xl border bg-white p-5 ${
          error
            ? "border-[var(--error)]"
            : "border-[var(--border)]"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--error-light)] text-[var(--error)]">
              <FileText size={20} aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-[var(--text-primary)]">
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
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)] transition hover:bg-[var(--error-light)] hover:text-[var(--error)]"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-xl bg-[var(--success-light)] px-3 py-2.5 text-sm font-semibold text-[var(--success-dark)]">
          <Check size={17} aria-hidden="true" />
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
        className={`group flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed bg-[var(--surface-secondary)]/35 p-6 text-center transition ${
          error
            ? "border-[var(--error)]"
            : "border-[var(--border-strong)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)]/45"
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

        <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] transition-transform duration-200 group-hover:-translate-y-1">
          <UploadCloud size={22} aria-hidden="true" />
        </div>

        <p className="mt-4 text-base font-semibold text-[var(--text-primary)]">
          {title} <span className="text-[var(--error)]">*</span>
        </p>

        <p className="mt-2 max-w-xs text-sm leading-6 text-[var(--text-secondary)]">
          {description}
        </p>

        <span className="mt-5 rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition group-hover:border-[var(--primary)] group-hover:text-[var(--primary)]">
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
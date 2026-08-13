"use client";

import { useState } from "react";

import { AverbacaoForm } from "@/components/averbacao/AverbacaoForm";
import { DtaSearch } from "@/components/averbacao/DtaSearch";
import { OperationData } from "@/components/averbacao/OperationData";
import { SubmissionSuccess } from "@/components/averbacao/SubmissionSuccess";
import { AppLayout } from "@/components/layout/AppLayout";
import type { DtaOperation } from "@/types/dta";

export default function AverbacaoPage() {
  const [operation, setOperation] = useState<DtaOperation | null>(null);
  const [submittedProtocol, setSubmittedProtocol] = useState<string | null>(
    null,
  );

  function handleClearOperation() {
    setOperation(null);
    setSubmittedProtocol(null);
  }

  function handleNewSubmission() {
    setOperation(null);
    setSubmittedProtocol(null);
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-up">
        <div>
          <p className="text-sm font-medium text-[var(--primary)]">
            Averbações
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Nova averbação
          </h2>

          <p className="mt-2 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
            Localize uma DTA, confira os dados da operação e envie os documentos necessários para averbação.
          </p>
        </div>

        <DtaSearch
          onSearch={(result) => {
            setOperation(result);
            setSubmittedProtocol(null);
          }}
          onClearResult={handleClearOperation}
          searchedDta={operation?.dta ?? null}
        />

        {operation && (
          <div className="grid items-start gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
            <OperationData operation={operation} />

            {submittedProtocol ? (
              <SubmissionSuccess
                protocol={submittedProtocol}
                onNewSubmission={handleNewSubmission}
              />
            ) : (
              <AverbacaoForm onSuccess={setSubmittedProtocol} />
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
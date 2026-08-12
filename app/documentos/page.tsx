"use client";

import { useState } from "react";

import { DocumentDetails } from "@/components/documentos/DocumentDetails";
import { DocumentResults } from "@/components/documentos/DocumentResults";
import { DocumentSearch } from "@/components/documentos/DocumentSearch";
import { AppLayout } from "@/components/layout/AppLayout";
import type { DocumentOperation } from "@/types/document";

export default function DocumentosPage() {
  const [results, setResults] = useState<DocumentOperation[]>([]);
  const [selectedOperation, setSelectedOperation] =
    useState<DocumentOperation | null>(null);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-[var(--primary)]">
            Documentos
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Consulta de documentos
          </h2>

          <p className="mt-2 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
            Consulte operações por DTA, DI ou DUIMP e acompanhe os documentos e status relacionados.
          </p>
        </div>

        <DocumentSearch
          onResults={(documents) => {
            setResults(documents);
            setSelectedOperation(null);
          }}
        />

        {results.length > 0 && (
          <DocumentResults
            operations={results}
            onSelect={setSelectedOperation}
          />
        )}

        {selectedOperation && (
          <DocumentDetails
            operation={selectedOperation}
            onClose={() => setSelectedOperation(null)}
          />
        )}
      </div>
    </AppLayout>
  );
}
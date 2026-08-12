import type { AverbacaoFormData } from "@/lib/validations/averbacao";

export type AverbacaoResponse = {
  protocol: string;
  status: "PROCESSING";
  message: string;
};

type ApiError = {
  message: string;
};

export async function submitAverbacao(
  data: AverbacaoFormData,
): Promise<AverbacaoResponse> {
  const response = await fetch("/api/averbacoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      processType: data.processType,
      broker: data.broker,
      referenceCode: data.referenceCode,
      exchangeCoverage: data.exchangeCoverage,
      accessKey: data.accessKey,
      pdfFileName: data.pdfFile?.name ?? null,
      xmlFileName: data.xmlFile?.name ?? null,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    const error = result as ApiError;

    throw new Error(
      error.message || "Não foi possível enviar a averbação.",
    );
  }

  return result as AverbacaoResponse;
}
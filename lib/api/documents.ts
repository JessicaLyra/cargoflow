import type { DocumentOperation } from "@/types/document";

type ApiError = {
  message: string;
};

export async function searchDocuments(
  number: string,
): Promise<DocumentOperation[]> {
  const response = await fetch(
    `/api/documents?search=${encodeURIComponent(number)}`,
  );

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    const error = (await response.json()) as ApiError;

    throw new Error(
      error.message || "Erro ao consultar os documentos.",
    );
  }

  return response.json() as Promise<DocumentOperation[]>;
}
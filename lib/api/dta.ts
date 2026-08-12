import type { DtaOperation } from "@/types/dta";

type ApiError = {
  message: string;
};

export async function getDtaOperation(
  dta: string,
): Promise<DtaOperation | null> {
  const response = await fetch(
    `/api/dta/${encodeURIComponent(dta)}`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const error = (await response.json()) as ApiError;

    throw new Error(
      error.message || "Erro ao consultar a DTA.",
    );
  }

  return response.json() as Promise<DtaOperation>;
}
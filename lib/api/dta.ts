import type { DtaOperation } from "@/types/dta";

const dtaOperations: DtaOperation[] = [
  {
    dta: "25/0004821-7",
    importer: "Global Parts Importação Ltda.",
    registrationDate: "22/05/2025 14:32",
    country: "China",
    modal: "Marítimo",
    knowledgeNumber: "COSU6385921450",
  },
  {
    dta: "25/0001842-7",
    importer: "Atlas Comércio Exterior Ltda.",
    registrationDate: "18/06/2025 09:45",
    country: "Estados Unidos",
    modal: "Aéreo",
    knowledgeNumber: "AWB987654321",
  },
  {
    dta: "25/0003510-4",
    importer: "Mercosul Trading Ltda.",
    registrationDate: "04/07/2025 16:20",
    country: "Chile",
    modal: "Rodoviário",
    knowledgeNumber: "CRT457896321",
  },
];

export async function getDtaOperation(
  dta: string,
): Promise<DtaOperation | null> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  return dtaOperations.find((operation) => operation.dta === dta) ?? null;
}
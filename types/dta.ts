export type DtaOperation = {
  dta: string;
  importer: string;
  registrationDate: string;
  country: string;
  modal: "Aéreo" | "Marítimo" | "Rodoviário";
  knowledgeNumber: string;
};
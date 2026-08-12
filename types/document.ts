export type DocumentStatus =
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";

export type DocumentFile = {
  name: string;
  type: "PDF" | "XML";
  size: string;
  url: string;
};

export type DocumentOperation = {
  id: string;
  documentType: "DTA" | "DI" | "DUIMP";
  documentNumber: string;
  dta: string;
  importer: string;
  country: string;
  modal: "Marítimo" | "Aéreo" | "Rodoviário";
  knowledgeNumber: string;
  createdAt: string;
  status: DocumentStatus;
  files: DocumentFile[];
};
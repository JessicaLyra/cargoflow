import fs from "node:fs";
import path from "node:path";

const outputDir = path.join(process.cwd(), "public", "documents");

fs.mkdirSync(outputDir, { recursive: true });

function escapePdfText(text) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function createPdf(filePath, lines) {
  const content = [
    "BT",
    "/F1 16 Tf",
    "50 780 Td",
    ...lines.flatMap((line, index) => [
      index === 0 ? "" : "0 -28 Td",
      `(${escapePdfText(line)}) Tj`,
    ]),
    "ET",
  ]
    .filter(Boolean)
    .join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets[index + 1] = Buffer.byteLength(pdf);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf);

  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF`;

  fs.writeFileSync(filePath, pdf);
}

const pdfDocuments = [
  {
    file: "dta-25-0004821-7.pdf",
    lines: [
      "CargoFlow - Documento Mock",
      "Tipo: DTA",
      "Numero: 25/0004821-7",
      "Importador: Global Parts Importacao Ltda.",
      "Modal: Maritimo",
    ],
  },
  {
    file: "duimp-26BR0000123456-7.pdf",
    lines: [
      "CargoFlow - Documento Mock",
      "Tipo: DUIMP",
      "Numero: 26BR0000123456-7",
      "Importador: Global Parts Importacao Ltda.",
      "Modal: Maritimo",
    ],
  },
  {
    file: "di-25-9876543-1.pdf",
    lines: [
      "CargoFlow - Documento Mock",
      "Tipo: DI",
      "Numero: 25/9876543-1",
      "Importador: Atlas Comercio Exterior Ltda.",
      "Modal: Aereo",
    ],
  },
  {
    file: "dta-25-0003510-4.pdf",
    lines: [
      "CargoFlow - Documento Mock",
      "Tipo: DTA",
      "Numero: 25/0003510-4",
      "Importador: Mercosul Trading Ltda.",
      "Modal: Rodoviario",
    ],
  },
];

for (const document of pdfDocuments) {
  createPdf(
    path.join(outputDir, document.file),
    document.lines,
  );
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<declaracaoImportacao>
  <numero>25/9876543-1</numero>
  <importador>Atlas Comercio Exterior Ltda.</importador>
  <paisOrigem>Estados Unidos</paisOrigem>
  <modal>Aereo</modal>
  <conhecimento>AWB987654321</conhecimento>
</declaracaoImportacao>
`;

fs.writeFileSync(
  path.join(outputDir, "di-25-9876543-1.xml"),
  xml,
);

console.log("Mock documents created successfully:");
console.log(outputDir);
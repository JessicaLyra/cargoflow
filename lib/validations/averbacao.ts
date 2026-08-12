import { z } from "zod";

export const averbacaoSchema = z
  .object({
    processType: z.enum(["DI", "DUIMP"], {
      message: "Selecione o tipo de processo.",
    }),

    broker: z
      .string()
      .min(1, "Selecione a comissária responsável."),

    referenceCode: z
      .string()
      .optional(),

    exchangeCoverage: z.enum(["yes", "no"], {
      message: "Informe se existe cobertura cambial.",
    }),

    accessKey: z
      .string()
      .optional(),

    pdfFile: z
      .instanceof(File, {
        message: "Selecione o arquivo PDF.",
      })
      .nullable(),

    xmlFile: z
      .instanceof(File, {
        message: "Selecione o arquivo XML.",
      })
      .nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.pdfFile) {
      ctx.addIssue({
        code: "custom",
        path: ["pdfFile"],
        message:
          data.processType === "DUIMP"
            ? "Envie o PDF da DUIMP."
            : "Envie o PDF da DI.",
      });
    }

    if (data.processType === "DUIMP") {
      if (!data.accessKey?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["accessKey"],
          message: "Informe a chave de acesso da DUIMP.",
        });
      }
    }

    if (data.processType === "DI") {
      if (!data.xmlFile) {
        ctx.addIssue({
          code: "custom",
          path: ["xmlFile"],
          message: "Envie o arquivo XML da DI.",
        });
      }
    }
  });

export type AverbacaoFormData = z.infer<typeof averbacaoSchema>;
import { delay, http, HttpResponse } from "msw";

import { documentOperations } from "@/mocks/data/documents";
import { dtaOperations } from "@/mocks/data/dta";

export const handlers = [
  // Consulta de DTA
  http.get("/api/dta/:number", async ({ params }) => {
    await delay(700);

    const number = decodeURIComponent(String(params.number));

    const operation = dtaOperations.find(
      (item) => item.dta === number,
    );

    if (!operation) {
      return HttpResponse.json(
        {
          message: "DTA não encontrada.",
        },
        {
          status: 404,
        },
      );
    }

    return HttpResponse.json(operation);
  }),

  // Consulta de documentos por DTA, DI ou DUIMP
  http.get("/api/documents", async ({ request }) => {
    await delay(700);

    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.trim();

    if (!search) {
      return HttpResponse.json(
        {
          message:
            "Informe uma DTA, DI ou DUIMP para realizar a consulta.",
        },
        {
          status: 400,
        },
      );
    }

    const operations = documentOperations.filter(
      (operation) =>
        operation.dta === search ||
        operation.documentNumber === search,
    );

    if (operations.length === 0) {
      return HttpResponse.json(
        {
          message:
            "Nenhum documento encontrado para a consulta informada.",
        },
        {
          status: 404,
        },
      );
    }

    return HttpResponse.json(operations);
  }),

  // Envio de averbação
  http.post("/api/averbacoes", async ({ request }) => {
    await delay(1200);

    const body = (await request.json()) as {
      processType: "DI" | "DUIMP";
      broker: string;
      referenceCode?: string;
      exchangeCoverage: "yes" | "no";
      accessKey?: string;
      pdfFileName: string | null;
      xmlFileName: string | null;
    };

    // Cenário controlado para simular erro da API
    if (body.referenceCode === "SIMULAR-ERRO") {
      return HttpResponse.json(
        {
          message:
            "Não foi possível processar a averbação. Tente novamente.",
        },
        {
          status: 500,
        },
      );
    }

    if (!body.broker) {
      return HttpResponse.json(
        {
          message: "Comissária obrigatória.",
        },
        {
          status: 400,
        },
      );
    }

    if (!body.pdfFileName) {
      return HttpResponse.json(
        {
          message: "Arquivo PDF obrigatório.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      body.processType === "DUIMP" &&
      !body.accessKey?.trim()
    ) {
      return HttpResponse.json(
        {
          message: "Chave de acesso da DUIMP obrigatória.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      body.processType === "DI" &&
      !body.xmlFileName
    ) {
      return HttpResponse.json(
        {
          message: "Arquivo XML da DI obrigatório.",
        },
        {
          status: 400,
        },
      );
    }

    const protocol = `AVB-${crypto.randomUUID()}`;

    return HttpResponse.json(
      {
        protocol,
        status: "PROCESSING",
        message:
          "Averbação recebida e enviada para processamento.",
      },
      {
        status: 201,
      },
    );
  }),
];
import { z } from "zod";

export const dtaSchema = z
  .string()
  .min(1, "Informe o número da DTA.")
  .regex(/^\d{2}\/\d{7}-\d$/, "Informe uma DTA válida. Ex.: 25/0004821-7");
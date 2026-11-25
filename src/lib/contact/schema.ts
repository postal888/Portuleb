import { z } from "zod";

export const MIN_CONTACT_MESSAGE = 10;
export const MAX_CONTACT_MESSAGE = 4000;
export const MAX_CONTACT_NAME = 120;

export const contactMessageSchema = z.object({
  name: z.string().trim().max(MAX_CONTACT_NAME, "Nome muito longo.").optional(),
  email: z.string().trim().email("Informe um e-mail válido."),
  message: z
    .string()
    .trim()
    .min(MIN_CONTACT_MESSAGE, `Escreva pelo menos ${MIN_CONTACT_MESSAGE} caracteres.`)
    .max(MAX_CONTACT_MESSAGE, `Mensagem muito longa (máximo ${MAX_CONTACT_MESSAGE}).`),
  locale: z.enum(["pt-br", "en", "ru", "es"]).optional(),
  /** Honeypot — bots fill this; humans leave it empty. */
  company: z.string().optional().default(""),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

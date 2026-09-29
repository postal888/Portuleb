import { getWritingTask } from "@/content/writing/tasks";
import { extractJsonObject } from "./json";
import { buildEssayCheckPrompts } from "./prompt";
import { modelEssayPayloadSchema, normalizeCorrections, type ModelEssayPayload } from "./schema";
import type { CheckEssayMeta, CheckEssayRequest } from "./types";

export class EssayProviderError extends Error {
  readonly statusCode: number;
  readonly code: string;

  constructor(statusCode: number, message: string, code: string) {
    super(message);
    this.name = "EssayProviderError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

function essayApiKey(): string | null {
  return process.env.ESSAY_LLM_API_KEY?.trim() || process.env.OPENAI_API_KEY?.trim() || null;
}

/**
 * A mocked correction looks like a real one on screen, so it is opt-in only —
 * never a side effect of NODE_ENV, which would silently ship demo results.
 */
export function essayMockAllowed(): boolean {
  return process.env.ESSAY_CHECK_ALLOW_MOCK === "1";
}

export function getEssayProviderStatus(): {
  openai: boolean;
  mock: boolean;
} {
  return {
    openai: Boolean(essayApiKey()),
    mock: essayMockAllowed(),
  };
}

async function callOpenAiCompatible(input: CheckEssayRequest): Promise<{
  payload: ModelEssayPayload;
  meta: CheckEssayMeta;
  raw: unknown;
}> {
  const apiKey = essayApiKey();
  if (!apiKey) {
    throw new EssayProviderError(503, "ESSAY_LLM_API_KEY / OPENAI_API_KEY não configurada", "not_configured");
  }

  const base = (process.env.ESSAY_LLM_BASE_URL?.trim() || "https://api.openai.com/v1").replace(/\/$/, "");
  const model = process.env.ESSAY_LLM_MODEL?.trim() || "gpt-4.1-mini";
  const { system, user } = buildEssayCheckPrompts(input, getWritingTask(input.taskId));
  const timeoutMs = 55_000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new EssayProviderError(504, "timeout", "timeout");
    }
    throw new EssayProviderError(502, "network_error", "network_error");
  } finally {
    clearTimeout(timer);
  }

  const data = (await res.json().catch(() => null)) as {
    error?: { message?: string };
    choices?: Array<{ message?: { content?: string } }>;
    model?: string;
  } | null;

  if (!res.ok) {
    throw new EssayProviderError(
      res.status >= 400 ? res.status : 502,
      data?.error?.message || `llm_error_${res.status}`,
      "llm_error",
    );
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new EssayProviderError(502, "empty_model_response", "empty_response");
  }

  const raw = extractJsonObject(content);
  const payload = modelEssayPayloadSchema.parse(raw);
  return {
    payload,
    raw,
    meta: { provider: "openai", model: data?.model || model, mock: false },
  };
}

export async function requestEssayModel(input: CheckEssayRequest): Promise<{
  payload: ModelEssayPayload;
  meta: CheckEssayMeta;
  raw: unknown;
}> {
  if (essayApiKey()) {
    return callOpenAiCompatible(input);
  }
  throw new EssayProviderError(503, "Nenhum provedor de correção configurado", "not_configured");
}

export function payloadToCorrections(payload: ModelEssayPayload) {
  return normalizeCorrections(payload.corrections);
}

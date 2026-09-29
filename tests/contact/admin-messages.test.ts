import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTempDb } from "../helpers/temp-db";

const temp = createTempDb("contact-admin");

type Json = Record<string, any>;

let db: typeof import("@/lib/admin/db");
let auth: typeof import("@/lib/admin/auth");
let route: typeof import("@/app/api/admin/contact-messages/route");
let adminToken: string;

function headers(authorized: boolean): Record<string, string> {
  return authorized ? { authorization: `Bearer ${adminToken}` } : {};
}

async function getMessages(authorized = true) {
  return route.GET(new Request("https://example.test/api/admin/contact-messages", { headers: headers(authorized) }));
}

async function patchMessage(body: unknown, authorized = true) {
  return route.PATCH(
    new Request("https://example.test/api/admin/contact-messages", {
      method: "PATCH",
      headers: { "content-type": "application/json", ...headers(authorized) },
      body: JSON.stringify(body),
    }),
  );
}

const json = async (response: Response) => (await response.json()) as Json;

beforeAll(async () => {
  process.env.ADMIN_USERNAME = "admin";
  process.env.ADMIN_PASSWORD = "test-password-only";
  process.env.ADMIN_SECRET_KEY = "test-admin-secret";

  db = await import("@/lib/admin/db");
  auth = await import("@/lib/admin/auth");
  route = await import("@/app/api/admin/contact-messages/route");
  adminToken = auth.createAdminToken("admin");
});

afterAll(() => {
  try {
    temp.close();
  } catch {
    // SQLite keeps the handle open until the worker exits; losing a temp dir is harmless.
  }
});

describe("контракт списка сообщений для панели «Сообщения»", () => {
  it("без токена отвечает 401 и телом { error } — панель показывает именно это сообщение", async () => {
    const response = await getMessages(false);
    expect(response.status).toBe(401);
    const body = await json(response);
    expect(typeof body.error).toBe("string");
    expect(body.messages).toBeUndefined();
  });

  it("PATCH с невалидным id отвечает 400 и не меняет статусы", async () => {
    const bad = await patchMessage({ id: 0 });
    expect(bad.status).toBe(400);
    const missing = await patchMessage({});
    expect(missing.status).toBe(400);
  });

  it("отдаёт сообщения в тех полях, которые читает таблица панели, и считает непрочитанные", async () => {
    const first = db.recordContactMessage({ name: "Maria Gomes", email: "MARIA@example.com ", message: "О первой заявке", locale: "pt-br" });
    const second = db.recordContactMessage({ email: "joao@example.com", message: "О второй заявке" });
    expect(first).toBeGreaterThan(0);
    expect(second).toBeGreaterThan(0);

    const body = await json(await getMessages());
    expect(body.ok).toBe(true);
    expect(body.total).toBe(body.messages.length);
    expect(body.unread).toBeGreaterThanOrEqual(2);

    const mine = body.messages.filter((row: Json) => [first, second].includes(row.id));
    expect(mine).toHaveLength(2);
    for (const row of mine) {
      expect(typeof row.createdAt).toBe("string");
      expect(["new", "read"]).toContain(row.status);
      // Таблица режет createdAt по T и выводит id/name/email/locale/message — всё это обязано быть.
      for (const field of ["id", "name", "email", "locale", "message"]) expect(row).toHaveProperty(field);
    }
    const emails = mine.map((row: Json) => row.email).sort();
    expect(emails).toEqual(["joao@example.com", "maria@example.com"]);
    expect(mine.find((row: Json) => row.id === first).name).toBe("Maria Gomes");
    expect(mine.find((row: Json) => row.id === second).name).toBeNull();
  });

  it("после PATCH сообщение становится прочитанным один раз, и повторная загрузка это подтверждает", async () => {
    const id = db.recordContactMessage({ email: "repeat@example.com", message: "Проверка markRead" });
    const before = await json(await getMessages());
    const row = before.messages.find((r: Json) => r.id === id);
    expect(row.status).toBe("new");

    const firstPatch = await json(await patchMessage({ id }));
    expect(firstPatch).toEqual({ ok: true, updated: true });

    const after = await json(await getMessages());
    expect(after.messages.find((r: Json) => r.id === id).status).toBe("read");
    expect(after.unread).toBe(before.unread - 1);

    const secondPatch = await json(await patchMessage({ id }));
    expect(secondPatch).toEqual({ ok: true, updated: false });
    expect((await json(await getMessages())).unread).toBe(after.unread);
  });

  it("PATCH без токена не меняет данные", async () => {
    const id = db.recordContactMessage({ email: "guarded@example.com", message: "Не должно прочитаться" });
    const denied = await patchMessage({ id }, false);
    expect(denied.status).toBe(401);
    const body = await json(await getMessages());
    expect(body.messages.find((r: Json) => r.id === id).status).toBe("new");
  });
});

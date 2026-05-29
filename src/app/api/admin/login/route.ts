import {
  adminSessionCookie,
  createAdminToken,
  isAdminConfigured,
  verifyAdminPassword,
} from "@/lib/admin/auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return Response.json({ error: "ADMIN_PASSWORD não configurado no servidor" }, { status: 503 });
  }
  const body = (await request.json()) as { username?: string; password?: string };
  if (!body.username || !body.password) {
    return Response.json({ error: "Usuário e senha obrigatórios" }, { status: 400 });
  }
  if (!verifyAdminPassword(body.username, body.password)) {
    return Response.json({ error: "Credenciais inválidas" }, { status: 401 });
  }
  const token = createAdminToken(body.username);
  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": adminSessionCookie(token),
    },
  });
}

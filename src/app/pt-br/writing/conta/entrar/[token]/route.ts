import { enterCabinet } from "@/lib/writer/cabinet-http";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  return enterCabinet("pt-br", token, request);
}

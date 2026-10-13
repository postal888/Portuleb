import { logoutCabinet } from "@/lib/writer/cabinet-http";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return logoutCabinet(request);
}

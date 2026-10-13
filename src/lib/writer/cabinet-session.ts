import { cookies } from "next/headers";
import { CABINET_COOKIE, sessionFromToken } from "./cabinet";

export async function currentCabinetEmail(): Promise<string | null> {
  const jar = await cookies();
  return sessionFromToken(jar.get(CABINET_COOKIE)?.value);
}

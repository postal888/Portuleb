import { redirect } from "next/navigation";

/** Legacy path under Ler — lesson moved to Ouvir. */
export default function HistoriaBrasil500AnosLegacyRedirect() {
  redirect("/pt-br/pratica/compreensao-auditiva/500-anos-historia-brasil");
}

import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "./session";

/**
 * Segunda camada de defesa: revalida a sessão dentro da própria Server
 * Action de escrita, sem confiar só no proxy que protege a navegação.
 */
export async function requireAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const session = await verifyAdminSessionToken(token);

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente com a service role key (ignora RLS). Só pode ser importado a
 * partir de ficheiros "actions.ts" sob /admin, depois de requireAdminSession().
 * Nunca em Server Components da landing nem em Client Components.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

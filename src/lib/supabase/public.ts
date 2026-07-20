import { createClient } from "@supabase/supabase-js";

/**
 * Cliente com a anon key, só para leitura (RLS garante que não há
 * insert/update/delete possíveis com esta chave, exceto onde uma policy de
 * insert público existe explicitamente, como em desportomais_pedidos_contacto).
 */
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);

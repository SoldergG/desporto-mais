"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function toggleLidaAction(id: string, lida: boolean) {
  await requireAdminSession();
  const { error } = await supabaseAdmin
    .from("desportomais_pedidos_contacto")
    .update({ lida })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/pedidos");
}

export async function deletePedidoAction(id: string) {
  await requireAdminSession();
  const { error } = await supabaseAdmin
    .from("desportomais_pedidos_contacto")
    .delete()
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/pedidos");
}

"use server";

import { supabasePublic } from "@/lib/supabase/public";
import { notificarPedidoContacto } from "@/lib/contacto/send-message";

export type PedidoContactoState = { error?: string; success?: boolean };

/**
 * Insere diretamente com a chave anon: a RLS de desportomais_pedidos_contacto
 * só permite insert (sem select/update/delete), por isso não é preciso
 * passar pela service role key aqui. O campo "empresa" é um honeypot —
 * invisível para humanos, mas normalmente preenchido por bots.
 */
export async function submeterPedidoContactoAction(
  _prevState: PedidoContactoState,
  formData: FormData
): Promise<PedidoContactoState> {
  const honeypot = String(formData.get("empresa") ?? "");
  if (honeypot.trim() !== "") {
    return { success: true };
  }

  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const localidade = String(formData.get("localidade") ?? "").trim();
  const telefone = String(formData.get("telefone") ?? "").trim();
  const mensagem = String(formData.get("mensagem") ?? "").trim();

  if (!nome || !email || !mensagem) {
    return { error: "Preenche o nome, email e mensagem." };
  }

  const { error } = await supabasePublic.from("desportomais_pedidos_contacto").insert({
    nome,
    email,
    localidade,
    telefone,
    mensagem,
  });

  if (error) {
    return { error: "Não foi possível enviar o pedido. Tenta novamente." };
  }

  // Best-effort: o pedido já está gravado acima, por isso uma falha aqui
  // (chave em falta, Resend indisponível) não deve impedir o sucesso — o
  // pedido continua visível em /admin/pedidos.
  await notificarPedidoContacto({ nome, email, localidade, telefone, mensagem });

  return { success: true };
}

import "server-only";

// Notificação por email de um novo pedido de contacto. O pedido já fica
// gravado em desportomais_pedidos_contacto (ver app/actions/pedido-contacto.ts)
// — este envio é um aviso best-effort por cima disso, nunca a única cópia do
// pedido: se o Resend falhar ou a chave não estiver configurada, o pedido
// continua visível em /admin/pedidos.

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Destinatário dos pedidos. Pode ser sobreposto por env; por omissão é o
// endereço oficial pedido.
const DESTINATARIO_PADRAO = "geral@desportomais.pt";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function enviarEmail(apiKey: string, payload: Record<string, unknown>): Promise<boolean> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export type PedidoContacto = {
  nome: string;
  email: string;
  localidade: string;
  telefone: string;
  mensagem: string;
};

/**
 * Notifica a Desporto Mais de um novo pedido de contacto. Best-effort:
 * devolve `false` em caso de falha (chave em falta, Resend indisponível,
 * etc.) mas nunca lança — quem chama já gravou o pedido na base de dados
 * antes disto, por isso uma falha aqui não deve impedir a resposta de
 * sucesso ao utilizador.
 */
export async function notificarPedidoContacto(pedido: PedidoContacto): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const destinatario = process.env.CONTACT_TO_EMAIL ?? DESTINATARIO_PADRAO;
  if (!EMAIL_RE.test(destinatario)) return false;

  const remetente = process.env.CONTACT_FROM_EMAIL ?? "Desporto Mais <onboarding@resend.dev>";

  const detalhes = [
    `Nome: ${pedido.nome}`,
    `Email: ${pedido.email}`,
    ...(pedido.localidade ? [`Localidade: ${pedido.localidade}`] : []),
    ...(pedido.telefone ? [`Contacto telefónico: ${pedido.telefone}`] : []),
    "",
    "Mensagem:",
    pedido.mensagem,
  ];

  const detalhesHtml = `
    <p><strong>Nome:</strong> ${escapeHtml(pedido.nome)}</p>
    <p><strong>Email:</strong> ${escapeHtml(pedido.email)}</p>
    ${pedido.localidade ? `<p><strong>Localidade:</strong> ${escapeHtml(pedido.localidade)}</p>` : ""}
    ${pedido.telefone ? `<p><strong>Contacto telefónico:</strong> ${escapeHtml(pedido.telefone)}</p>` : ""}
    <p style="margin-top: 16px;"><strong>Mensagem:</strong></p>
    <p style="white-space: pre-wrap;">${escapeHtml(pedido.mensagem)}</p>
  `;

  return enviarEmail(apiKey, {
    from: remetente,
    to: [destinatario],
    reply_to: pedido.email,
    subject: `Novo pedido de contacto — ${pedido.nome}`,
    text: detalhes.join("\n"),
    html: `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px;">Novo pedido de contacto</h2>${detalhesHtml}</div>`,
  });
}

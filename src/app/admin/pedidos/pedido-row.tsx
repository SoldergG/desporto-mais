"use client";

import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { deletePedidoAction, toggleLidaAction } from "./actions";

type PedidoRowData = {
  id: string;
  nome: string;
  email: string;
  localidade: string;
  telefone: string;
  mensagem: string;
  lida: boolean;
  created_at: string;
};

export function PedidoRow({ pedido }: { pedido: PedidoRowData }) {
  const data = new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(pedido.created_at));

  return (
    <div className="border border-border bg-paper p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg text-ink">{pedido.nome}</p>
          <p className="text-xs text-ink-muted">
            {data}
            {pedido.localidade && ` · ${pedido.localidade}`}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-ink-muted">
            <input
              type="checkbox"
              defaultChecked={pedido.lida}
              onChange={(event) => toggleLidaAction(pedido.id, event.target.checked)}
            />
            Lida
          </label>
          <ConfirmDeleteButton action={() => deletePedidoAction(pedido.id)} />
        </div>
      </div>

      <p className="mt-3 text-sm text-ink">{pedido.mensagem}</p>

      <div className="mt-3 flex flex-wrap gap-4 text-xs text-ink-muted">
        <a href={`mailto:${pedido.email}`} className="hover:text-ink">
          {pedido.email}
        </a>
        {pedido.telefone && (
          <a href={`tel:${pedido.telefone.replace(/\s/g, "")}`} className="hover:text-ink">
            {pedido.telefone}
          </a>
        )}
      </div>
    </div>
  );
}

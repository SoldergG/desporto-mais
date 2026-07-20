import { AdminShell } from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { PedidoRow } from "./pedido-row";

export default async function PedidosPage() {
  const { data: pedidos, error } = await supabaseAdmin
    .from("desportomais_pedidos_contacto")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;

  return (
    <AdminShell title="Pedidos de contacto">
      <div className="flex flex-col gap-3">
        {(pedidos ?? []).map((pedido) => (
          <PedidoRow key={pedido.id} pedido={pedido} />
        ))}
        {pedidos?.length === 0 && (
          <p className="text-sm text-ink-muted">Ainda não há pedidos de contacto.</p>
        )}
      </div>
    </AdminShell>
  );
}

import { AdminShell } from "@/components/admin/AdminShell";
import { getServicos } from "@/lib/content/queries";
import { ServicosTabs } from "./servico-form";

export default async function ServicosPage() {
  const servicos = await getServicos();

  return (
    <AdminShell title="O que fazemos">
      <ServicosTabs servicos={servicos} />
    </AdminShell>
  );
}

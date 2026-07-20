import { AdminShell } from "@/components/admin/AdminShell";
import { getSobre } from "@/lib/content/queries";
import { SobreForm } from "./client-form";

export default async function SobrePage() {
  const sobre = await getSobre();

  return (
    <AdminShell title="Quem Somos">
      <SobreForm sobre={sobre} />
    </AdminShell>
  );
}

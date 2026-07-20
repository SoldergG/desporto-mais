import { AdminShell } from "@/components/admin/AdminShell";
import { createParceriaAction } from "../actions";
import { ParceriaForm } from "../parceria-form";

export default function NovaParceriaPage() {
  return (
    <AdminShell title="Nova parceria" backHref="/admin/parcerias">
      <ParceriaForm
        action={createParceriaAction}
        initialValues={{ titulo: "", href: "", image_path: null, image_alt: "" }}
        submitLabel="Criar parceria"
      />
    </AdminShell>
  );
}

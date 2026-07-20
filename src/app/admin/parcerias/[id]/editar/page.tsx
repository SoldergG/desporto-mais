import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { updateParceriaAction } from "../../actions";
import { ParceriaForm } from "../../parceria-form";

export default async function EditarParceriaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from("desportomais_parcerias")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) notFound();

  return (
    <AdminShell title="Editar parceria" backHref="/admin/parcerias">
      <ParceriaForm
        action={updateParceriaAction.bind(null, id)}
        initialValues={{
          titulo: data.titulo,
          href: data.href,
          image_path: data.image_path,
          image_alt: data.image_alt,
        }}
        submitLabel="Guardar alterações"
      />
    </AdminShell>
  );
}

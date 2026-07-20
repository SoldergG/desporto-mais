import { AdminShell } from "@/components/admin/AdminShell";
import { getContacto } from "@/lib/content/queries";
import { ContactoForm } from "./client-form";

export default async function ContactoPage() {
  const contacto = await getContacto();

  return (
    <AdminShell title="Contacto">
      <ContactoForm contacto={contacto} />
    </AdminShell>
  );
}

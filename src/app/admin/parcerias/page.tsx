import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { ParceriaRow } from "./parceria-row";

export default async function ParceriasPage() {
  const { data: parcerias, error } = await supabaseAdmin
    .from("desportomais_parcerias")
    .select("id, titulo, publicado")
    .order("ordem", { ascending: true });
  if (error) throw error;

  return (
    <AdminShell title="Parcerias">
      <Link
        href="/admin/parcerias/novo"
        className="mb-6 inline-flex h-11 items-center bg-orange px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
      >
        + Nova parceria
      </Link>

      <div className="flex flex-col gap-3">
        {(parcerias ?? []).map((parceria) => (
          <ParceriaRow key={parceria.id} parceria={parceria} />
        ))}
        {parcerias?.length === 0 && (
          <p className="text-sm text-ink-muted">Ainda não há parcerias.</p>
        )}
      </div>
    </AdminShell>
  );
}

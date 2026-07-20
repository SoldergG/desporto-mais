import { AdminShell } from "@/components/admin/AdminShell";
import { getAviso, getHero } from "@/lib/content/queries";
import { AvisoForm, HeroForm } from "./client-forms";

export default async function HeroAvisoPage() {
  const [hero, aviso] = await Promise.all([getHero(), getAviso()]);

  return (
    <AdminShell title="Hero & Aviso">
      <div className="flex flex-col gap-8">
        <HeroForm hero={hero} />
        <AvisoForm aviso={aviso} />
      </div>
    </AdminShell>
  );
}

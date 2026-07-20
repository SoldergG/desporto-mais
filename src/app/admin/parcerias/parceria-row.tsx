"use client";

import Link from "next/link";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { deleteParceriaAction, toggleParceriaPublicadoAction } from "./actions";

type ParceriaRowData = {
  id: string;
  titulo: string;
  publicado: boolean;
};

export function ParceriaRow({ parceria }: { parceria: ParceriaRowData }) {
  return (
    <div className="flex items-center justify-between gap-4 border border-border bg-paper p-4">
      <p className="font-display text-lg text-ink">{parceria.titulo}</p>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-ink-muted">
          <input
            type="checkbox"
            defaultChecked={parceria.publicado}
            onChange={(event) => toggleParceriaPublicadoAction(parceria.id, event.target.checked)}
          />
          Publicado
        </label>
        <Link
          href={`/admin/parcerias/${parceria.id}/editar`}
          className="h-8 border border-border px-3 text-xs uppercase tracking-[0.08em] text-ink-muted transition-colors hover:border-olive hover:text-olive"
        >
          Editar
        </Link>
        <ConfirmDeleteButton action={() => deleteParceriaAction(parceria.id)} />
      </div>
    </div>
  );
}

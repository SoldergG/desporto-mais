"use client";

import { useActionState } from "react";
import type { SectionFormState } from "@/lib/admin/form-state";
import type { Contacto } from "@/lib/content/types";
import { updateContactoAction } from "./actions";

const initialState: SectionFormState = {};

const inputClass =
  "mt-1.5 w-full border border-border bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange-soft";

export function ContactoForm({ contacto }: { contacto: Contacto }) {
  const [state, action, pending] = useActionState(updateContactoAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-5 border border-border bg-paper p-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-ink">Morada (linha 1)</label>
          <input name="morada_linha1" defaultValue={contacto.moradaLinha1} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Morada (linha 2)</label>
          <input name="morada_linha2" defaultValue={contacto.moradaLinha2} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Morada (linha 3)</label>
          <input name="morada_linha3" defaultValue={contacto.moradaLinha3} className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink">Telefone</label>
          <input name="telefone" defaultValue={contacto.telefone} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Email</label>
          <input name="email" type="email" defaultValue={contacto.email} className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-ink">Link do Facebook</label>
        <input name="facebook_url" defaultValue={contacto.facebookUrl} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink">
          URL do Google Maps (embed, com &amp;output=embed no fim)
        </label>
        <input
          name="google_maps_url"
          defaultValue={contacto.googleMapsEmbedUrl}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex h-11 w-fit items-center justify-center bg-olive px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-cream transition-colors hover:bg-olive-dark disabled:opacity-60"
      >
        {pending ? "A guardar…" : "Guardar"}
      </button>
      {state.error && <p className="text-sm text-orange-dark">{state.error}</p>}
      {state.success && <p className="text-sm text-olive">Guardado.</p>}
    </form>
  );
}

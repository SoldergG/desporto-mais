"use client";

import { useActionState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { SectionFormState } from "@/lib/admin/form-state";
import type { Aviso, Hero } from "@/lib/content/types";
import { updateAvisoAction, updateHeroAction } from "./actions";

const initialState: SectionFormState = {};

const inputClass =
  "mt-1.5 w-full border border-border bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange-soft";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink">{label}</label>
      {children}
    </div>
  );
}

function FormStatus({ state }: { state: SectionFormState }) {
  if (state.error) return <p className="mt-3 text-sm text-orange-dark">{state.error}</p>;
  if (state.success) return <p className="mt-3 text-sm text-olive">Guardado.</p>;
  return null;
}

export function HeroForm({ hero }: { hero: Hero }) {
  const [state, action, pending] = useActionState(updateHeroAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-5 border border-border bg-paper p-6">
      <h2 className="font-display text-xl text-ink">Hero</h2>

      <Field label="Kicker (texto pequeno acima do título)">
        <input name="kicker" defaultValue={hero.kicker} className={inputClass} />
      </Field>
      <Field label="Título">
        <textarea name="headline" defaultValue={hero.headline} rows={2} className={inputClass} />
      </Field>
      <Field label="Subtítulo">
        <textarea
          name="subheadline"
          defaultValue={hero.subheadline}
          rows={3}
          className={inputClass}
        />
      </Field>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Texto do botão principal">
          <input name="cta_label" defaultValue={hero.ctaLabel} className={inputClass} />
        </Field>
        <Field label="Destino do botão (ex.: #pedido-contacto)">
          <input name="cta_href" defaultValue={hero.ctaHref} className={inputClass} />
        </Field>
      </div>
      <ImageUploadField name="image" label="Imagem" currentImageSrc={hero.imageSrc} />
      <Field label="Texto alternativo da imagem">
        <input name="image_alt" defaultValue={hero.imageAlt} className={inputClass} />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex h-11 w-fit items-center justify-center bg-olive px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-cream transition-colors hover:bg-olive-dark disabled:opacity-60"
      >
        {pending ? "A guardar…" : "Guardar Hero"}
      </button>
      <FormStatus state={state} />
    </form>
  );
}

export function AvisoForm({ aviso }: { aviso: Aviso }) {
  const [state, action, pending] = useActionState(updateAvisoAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-5 border border-border bg-paper p-6">
      <h2 className="font-display text-xl text-ink">Aviso (banner opcional na home)</h2>
      <p className="text-sm text-ink-muted">
        Usa para anúncios pontuais — recrutamento ativo, migração de sub-marca, etc. Fica
        escondido quando desativado.
      </p>

      <label className="flex items-center gap-2 text-sm font-medium text-ink">
        <input type="checkbox" name="ativo" defaultChecked={aviso.ativo} />
        Mostrar este aviso no site
      </label>

      <Field label="Título">
        <input name="titulo" defaultValue={aviso.titulo} className={inputClass} />
      </Field>
      <Field label="Texto">
        <textarea name="texto" defaultValue={aviso.texto} rows={3} className={inputClass} />
      </Field>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Texto do link">
          <input name="link_label" defaultValue={aviso.linkLabel} className={inputClass} />
        </Field>
        <Field label="Destino do link">
          <input name="link_href" defaultValue={aviso.linkHref} className={inputClass} />
        </Field>
      </div>
      <ImageUploadField name="image" label="Imagem (opcional)" currentImageSrc={aviso.imageSrc} />
      <Field label="Texto alternativo da imagem">
        <input name="image_alt" defaultValue={aviso.imageAlt} className={inputClass} />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex h-11 w-fit items-center justify-center bg-olive px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-cream transition-colors hover:bg-olive-dark disabled:opacity-60"
      >
        {pending ? "A guardar…" : "Guardar Aviso"}
      </button>
      <FormStatus state={state} />
    </form>
  );
}

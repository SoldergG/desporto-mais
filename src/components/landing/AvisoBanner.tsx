import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Aviso } from "@/lib/content/types";
import { RevealOnScroll } from "./RevealOnScroll";

/**
 * Bloco editável para avisos pontuais (ex: recrutamento ativo, aviso de
 * migração de sub-marca) — substitui os banners estáticos que existiam no
 * site antigo. O admin liga/desliga em /admin/hero-aviso.
 */
export function AvisoBanner({ aviso }: { aviso: Aviso }) {
  if (!aviso.ativo) return null;

  return (
    <section className="border-y border-border bg-olive-soft py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealOnScroll>
          <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[auto_1fr_auto] sm:gap-8">
            {aviso.imageSrc && (
              <div className="relative h-20 w-32 shrink-0 overflow-hidden border border-border bg-paper sm:h-24 sm:w-40">
                <Image
                  src={aviso.imageSrc}
                  alt={aviso.imageAlt}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-display text-xl text-ink">{aviso.titulo}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{aviso.texto}</p>
            </div>
            {aviso.linkHref && (
              <a
                href={aviso.linkHref}
                target={aviso.linkHref.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="inline-flex h-11 shrink-0 items-center gap-1.5 border border-border bg-paper px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:border-olive hover:text-olive"
              >
                {aviso.linkLabel}
                <ArrowUpRight size={14} weight="light" />
              </a>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

import Image from "next/image";
import type { Sobre } from "@/lib/content/types";
import { RevealOnScroll } from "./RevealOnScroll";

export function QuemSomos({ content }: { content: Sobre }) {
  const anosDeAtividade = new Date().getFullYear() - content.anoFundacao;

  return (
    <section id="quem-somos" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <RevealOnScroll className="relative order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden border border-border">
              <Image
                src="/foto-quemsomos.jpg"
                alt={content.imageAlt}
                fill
                sizes="(min-width: 1024px) 230px, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden border border-border">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/desporto-futebol.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-label="Atividades desportivas Desporto Mais"
              />
            </div>
          </div>
          <div className="absolute -bottom-6 -right-4 border border-border bg-paper px-5 py-4 sm:-right-8">
            <p className="font-display text-3xl text-orange-dark">{anosDeAtividade}</p>
            <p className="text-xs uppercase tracking-[0.1em] text-ink-muted">anos de experiência</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="order-1 lg:order-2">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">{content.titulo}</h2>

          <div className="mt-6">
            <p className="mt-2 max-w-[60ch] text-base leading-relaxed text-ink-muted">
              {content.textoDesportoMais}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

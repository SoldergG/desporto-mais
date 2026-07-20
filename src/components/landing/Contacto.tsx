import { Envelope, FacebookLogo, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import type { Contacto as ContactoContent } from "@/lib/content/types";
import { RevealOnScroll } from "./RevealOnScroll";

export function Contacto({ content }: { content: ContactoContent }) {
  return (
    <section id="contactos" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <RevealOnScroll>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Contactos</h2>
          <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-ink-muted">
            Autarquias, clubes e associações podem contactar-nos diretamente.
          </p>

          <div className="mt-8 flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <MapPin size={20} weight="light" className="mt-0.5 shrink-0 text-olive" />
              <p className="text-sm leading-relaxed text-ink">
                {content.moradaLinha1}
                <br />
                {content.moradaLinha2}
                <br />
                {content.moradaLinha3}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} weight="light" className="shrink-0 text-olive" />
              <a href={`tel:${content.telefone.replace(/\s/g, "")}`} className="text-sm text-ink">
                {content.telefone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Envelope size={20} weight="light" className="shrink-0 text-olive" />
              <a href={`mailto:${content.email}`} className="text-sm text-ink">
                {content.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FacebookLogo size={20} weight="light" className="shrink-0 text-olive" />
              <a
                href={content.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink"
              >
                Facebook
              </a>
            </div>
          </div>

          <a
            href="#pedido-contacto"
            className="mt-8 inline-flex h-12 items-center bg-orange px-7 text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
          >
            Fazer um pedido de contacto
          </a>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="h-full min-h-[360px] w-full overflow-hidden border border-border">
            <iframe
              src={content.googleMapsEmbedUrl}
              title="Localização da Desporto Mais em Algés"
              className="h-full w-full min-h-[360px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

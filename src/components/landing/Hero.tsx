import Image from "next/image";
import type { Hero as HeroContent } from "@/lib/content/types";
import { RevealOnScroll } from "./RevealOnScroll";

export function Hero({ content }: { content: HeroContent }) {
  return (
    <section id="top" className="pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <RevealOnScroll>
          <p className="text-[13px] uppercase tracking-[0.16em] text-olive">{content.kicker}</p>
          <h1 className="mt-5 pb-1 font-display text-[2.6rem] leading-[1.15] text-ink sm:text-5xl lg:text-[3.4rem]">
            {content.headline}
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
            {content.subheadline}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={content.ctaHref}
              className="inline-flex h-12 items-center bg-orange px-7 text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
            >
              {content.ctaLabel}
            </a>
            <a
              href="#o-que-fazemos"
              className="inline-flex h-12 items-center border border-border px-7 text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:border-olive hover:text-olive"
            >
              O que fazemos
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-border">
            <Image
              src={content.imageSrc}
              alt={content.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

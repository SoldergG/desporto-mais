import Image from "next/image";
import type { Parceria } from "@/lib/content/types";
import { RevealOnScroll } from "./RevealOnScroll";

export function Parcerias({ parcerias }: { parcerias: Parceria[] }) {
  return (
    <section id="parcerias" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealOnScroll className="max-w-xl">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Parcerias</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Trabalhamos em rede com marcas e organizações que partilham os nossos valores.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {parcerias.map((parceria, index) => (
            <RevealOnScroll key={parceria.id} delay={index * 0.06}>
              <a
                href={parceria.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-28 items-center justify-center border border-border bg-paper p-6 transition-colors hover:border-olive"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={parceria.imageSrc}
                    alt={parceria.imageAlt}
                    fill
                    sizes="200px"
                    className="object-contain"
                  />
                </div>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

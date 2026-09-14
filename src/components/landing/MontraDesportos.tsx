import Image from "next/image";
import { RevealOnScroll } from "./RevealOnScroll";

type Montra = {
  label: string;
  video?: string;
  image?: string;
};

const MONTRA: Montra[] = [
  { label: "Natação", video: "/hero-natacao.mp4" },
  { label: "Hidroginástica", image: "/mod-hidroginastica.jpg" },
  { label: "Ginásio", video: "/desporto-ginasio.mp4" },
  { label: "Aulas de grupo", video: "/desporto-aulas-grupo.mp4" },
  { label: "Pilates", video: "/desporto-pilates.mp4" },
  { label: "Atletismo", video: "/desporto-atletismo.mp4" },
  { label: "Futebol", video: "/desporto-futebol.mp4" },
  { label: "Basquetebol", video: "/desporto-basquete.mp4" },
  { label: "Andebol", video: "/desporto-andebol.mp4" },
];

export function MontraDesportos() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealOnScroll className="max-w-xl">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Desporto em movimento</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Da água ao ginásio — várias modalidades para todas as idades, a mesma dedicação.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {MONTRA.map((item, index) => (
            <RevealOnScroll key={item.label} delay={index * 0.06}>
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-border">
                {item.video ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label={item.label}
                  />
                ) : (
                  <Image
                    src={item.image!}
                    alt={item.label}
                    fill
                    sizes="(min-width: 640px) 320px, 45vw"
                    className="object-cover"
                  />
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent p-4">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-cream">
                    {item.label}
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

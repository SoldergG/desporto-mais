import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { Servico } from "@/lib/content/types";
import { RevealOnScroll } from "./RevealOnScroll";

function PontoTag({ label }: { label: string }) {
  return (
    <span className="border border-border px-3 py-1 text-xs uppercase tracking-[0.06em] text-ink-muted">
      {label}
    </span>
  );
}

function ServicoBlock({ servico, reverse }: { servico: Servico; reverse: boolean }) {
  return (
    <div className="grid grid-cols-1 overflow-hidden border border-border bg-paper sm:grid-cols-2">
      <div className={`grid grid-cols-2 gap-2 p-2 ${reverse ? "sm:order-2" : ""}`}>
        <div className="relative aspect-[3/4] overflow-hidden border border-border">
          <Image
            src="/foto-servico-natacao.jpg"
            alt={servico.imageAlt}
            fill
            sizes="(min-width: 1024px) 280px, 45vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-[3/4] overflow-hidden border border-border">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/desporto-natacao-2.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-label={servico.imageAlt}
          />
        </div>
      </div>
      <div className={`flex flex-col justify-center p-8 sm:p-10 ${reverse ? "sm:order-1" : ""}`}>
        <h3 className="font-display text-2xl text-ink">{servico.titulo}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{servico.resumo}</p>
        <ul className="mt-5 flex flex-col gap-2">
          {servico.pontos.map((ponto) => (
            <li key={ponto} className="flex items-start gap-2.5 text-sm text-ink-muted">
              <CheckCircle size={18} weight="light" className="mt-0.5 shrink-0 text-olive" />
              <span>{ponto}</span>
            </li>
          ))}
        </ul>

        {servico.objetivosPontos.length > 0 && (
          <div className="mt-6 border-t border-border pt-5">
            <p className="text-sm font-medium text-ink">{servico.objetivosTitulo}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {servico.objetivosPontos.map((ponto) => (
                <PontoTag key={ponto} label={ponto} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Servicos({ servicos }: { servicos: Servico[] }) {
  const servicosVisiveis = servicos.filter((servico) => servico.slug !== "salva-mais");

  return (
    <section id="o-que-fazemos" className="bg-cream-soft py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealOnScroll className="max-w-xl">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">O que fazemos</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            A nossa área de atuação especializada, com a equipa e o know-how do grupo
            Espalha Ideias.
          </p>
        </RevealOnScroll>

        <div className="mt-10 flex flex-col gap-6">
          {servicosVisiveis.map((servico, index) => (
            <RevealOnScroll key={servico.slug} delay={index * 0.08}>
              <ServicoBlock servico={servico} reverse={index % 2 === 1} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

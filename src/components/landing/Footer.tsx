import Image from "next/image";
import { FacebookLogo } from "@phosphor-icons/react/dist/ssr";

const FOOTER_LINKS = [
  { label: "Quem somos", href: "#quem-somos" },
  { label: "O que fazemos", href: "#o-que-fazemos" },
  { label: "Parcerias", href: "#parcerias" },
  { label: "Contactos", href: "#contactos" },
  { label: "Pedido de contacto", href: "#pedido-contacto" },
];

export function Footer({ facebookUrl }: { facebookUrl: string }) {
  return (
    <footer className="border-t border-border bg-cream-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <a href="#top" aria-label="Desporto Mais — início">
          <Image
            src="/desporto-mais-logo.png"
            alt="Desporto Mais"
            width={376}
            height={134}
            className="h-16 w-auto sm:h-20"
          />
        </a>

        <nav className="flex flex-wrap items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] uppercase tracking-[0.1em] text-ink-muted hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Desporto Mais no Facebook"
          className="text-ink-muted hover:text-ink"
        >
          <FacebookLogo size={20} weight="light" />
        </a>
      </div>
      <div className="border-t border-border px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} Espalha Ideias. Todos os direitos reservados. site powered
            by Via Educação
          </p>
        </div>
      </div>
    </footer>
  );
}

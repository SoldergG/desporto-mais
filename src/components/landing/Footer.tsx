import { FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import { Wordmark } from "./LogoMark";

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
        <Wordmark className="font-display text-base tracking-[0.2em] text-ink" />

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
            © {new Date().getFullYear()} Desporto Mais. Todos os direitos reservados. · Marca do
            grupo{" "}
            <a
              href="https://www.espalhaideias.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-ink"
            >
              Espalha Ideias
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

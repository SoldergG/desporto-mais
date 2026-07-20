"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Wordmark } from "./LogoMark";

const NAV_LINKS = [
  { label: "Quem somos", href: "#quem-somos" },
  { label: "O que fazemos", href: "#o-que-fazemos" },
  { label: "Parcerias", href: "#parcerias" },
  { label: "Contactos", href: "#contactos" },
];

const RECRUTAMENTO_HREF = "https://portalei.espalhaideias.pt/";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top">
          <Wordmark className="font-display text-lg tracking-[0.2em] text-ink sm:text-xl" />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href={RECRUTAMENTO_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
          >
            Recrutamento
          </a>
        </nav>

        <div className="hidden lg:block">
          <a
            href="#pedido-contacto"
            className="inline-flex h-11 items-center bg-orange px-6 text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-orange-dark hover:text-cream"
          >
            Pedido de contacto
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
        >
          {open ? <X size={22} weight="light" /> : <List size={22} weight="light" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-cream px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3.5 text-[13px] uppercase tracking-[0.12em] text-ink-muted"
              >
                {link.label}
              </a>
            ))}
            <a
              href={RECRUTAMENTO_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="border-b border-border py-3.5 text-[13px] uppercase tracking-[0.12em] text-ink-muted last:border-b-0"
            >
              Recrutamento
            </a>
          </nav>
          <a
            href="#pedido-contacto"
            onClick={() => setOpen(false)}
            className="mt-4 flex h-11 items-center justify-center bg-orange text-center text-[13px] font-medium uppercase tracking-[0.12em] text-ink"
          >
            Pedido de contacto
          </a>
        </div>
      )}
    </header>
  );
}

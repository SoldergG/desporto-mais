type WordmarkProps = {
  className?: string;
  lineClassName?: string;
};

/**
 * Wordmark tipográfico da Desporto Mais: serifado, versalete espaçado e um
 * traço fino por baixo, no mesmo espírito da identidade AMUN partilhada
 * com a Espalha Ideias.
 */
export function Wordmark({ className, lineClassName }: WordmarkProps) {
  return (
    <span className="inline-flex flex-col items-start">
      <span className={className ?? "font-display text-xl tracking-[0.22em] text-ink"}>
        DESPORTO MAIS
      </span>
      <span
        className={lineClassName ?? "mt-1 h-px w-8 bg-olive"}
        aria-hidden="true"
      />
    </span>
  );
}

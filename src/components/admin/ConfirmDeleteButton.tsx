"use client";

import { useState } from "react";

export function ConfirmDeleteButton({ action }: { action: () => void }) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-ink-muted">Apagar?</span>
        <button
          type="button"
          onClick={() => action()}
          className="h-8 border border-orange-dark px-3 text-xs uppercase tracking-[0.08em] text-orange-dark"
        >
          Sim
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="h-8 border border-border px-3 text-xs uppercase tracking-[0.08em] text-ink-muted"
        >
          Não
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="h-8 border border-border px-3 text-xs uppercase tracking-[0.08em] text-ink-muted transition-colors hover:border-orange-dark hover:text-orange-dark"
    >
      Apagar
    </button>
  );
}

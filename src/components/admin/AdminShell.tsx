import Link from "next/link";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/landing/LogoMark";
import { logoutAction } from "@/app/admin/logout/actions";

export function AdminShell({
  title,
  backHref = "/admin",
  children,
}: {
  title: string;
  backHref?: string | null;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-cream px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <Wordmark className="font-display text-lg tracking-[0.2em] text-ink" />
            <h1 className="mt-4 font-display text-2xl text-ink">{title}</h1>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="h-11 border border-border bg-paper px-4 text-[13px] uppercase tracking-[0.1em] text-ink-muted transition-colors hover:border-orange hover:text-orange-dark"
            >
              Terminar sessão
            </button>
          </form>
        </div>

        {backHref && (
          <Link
            href={backHref}
            className="mt-6 inline-block text-[13px] uppercase tracking-[0.1em] text-ink-muted hover:text-ink"
          >
            ← Painel
          </Link>
        )}

        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}

"use client";

import { useActionState } from "react";
import { Wordmark } from "@/components/landing/LogoMark";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form
        action={action}
        className="w-full max-w-sm border border-border bg-paper p-8"
      >
        <Wordmark className="font-display text-lg tracking-[0.2em] text-ink" />
        <h1 className="mt-5 font-display text-2xl text-ink">Portal de administração</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Introduz a password para editar o conteúdo do site.
        </p>

        <label htmlFor="password" className="mt-6 block text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="mt-1.5 w-full border border-border bg-cream px-3 py-2 text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange-soft"
        />

        {state?.error && (
          <p role="alert" className="mt-3 text-sm text-orange-dark">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 flex h-11 w-full items-center justify-center bg-olive text-[13px] font-medium uppercase tracking-[0.12em] text-cream transition-colors hover:bg-olive-dark disabled:opacity-60"
        >
          {pending ? "A entrar…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}

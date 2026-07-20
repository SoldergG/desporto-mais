"use client";

import { useActionState } from "react";
import {
  submeterPedidoContactoAction,
  type PedidoContactoState,
} from "@/app/actions/pedido-contacto";
import { RevealOnScroll } from "./RevealOnScroll";

const inputClass =
  "mt-1.5 w-full border border-border bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange-soft";

const initialState: PedidoContactoState = {};

export function PedidoContactoForm() {
  const [state, action, pending] = useActionState(submeterPedidoContactoAction, initialState);

  return (
    <section id="pedido-contacto" className="bg-cream-soft py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <RevealOnScroll>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Pedido de contacto</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Preenche o formulário e entramos em contacto o mais brevemente possível.
          </p>

          {state.success ? (
            <p className="mt-8 border border-olive bg-olive-soft p-6 text-sm text-ink">
              Pedido enviado com sucesso. Obrigado — entraremos em contacto brevemente.
            </p>
          ) : (
            <form action={action} className="relative mt-8 flex flex-col gap-5">
              <input
                type="text"
                name="empresa"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 opacity-0"
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-ink">Nome *</label>
                  <input type="text" name="nome" required className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink">Email *</label>
                  <input type="email" name="email" required className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-ink">Localidade</label>
                  <input type="text" name="localidade" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink">
                    Contacto telefónico
                  </label>
                  <input type="tel" name="telefone" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">Mensagem *</label>
                <textarea name="mensagem" required rows={5} className={inputClass} />
              </div>

              {state.error && <p className="text-sm text-orange-dark">{state.error}</p>}

              <button
                type="submit"
                disabled={pending}
                className="mt-2 flex h-12 w-fit items-center justify-center bg-olive px-8 text-[13px] font-medium uppercase tracking-[0.12em] text-cream transition-colors hover:bg-olive-dark disabled:opacity-60"
              >
                {pending ? "A enviar…" : "Enviar pedido"}
              </button>
            </form>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}

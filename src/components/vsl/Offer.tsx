import { useEffect, useRef } from "react";
import { Check, Lock } from "lucide-react";

import { vslConfig } from "@/config/vslConfig";
import { track } from "@/lib/tracking";

import { Reveal, SafeImage } from "./shared";
import { PurchaseButton } from "./PurchaseButton";

export function Offer() {
  const o = vslConfig.offer;

  const offerRef = useRef<HTMLElement | null>(null);
  const pricingRef = useRef<HTMLDivElement | null>(null);

  /**
   * =========================================
   * META PIXEL / GA4 / GTM
   * =========================================
   *
   * Rastreia quando o usuário:
   *
   * 1. Chega na seção de oferta
   * 2. Visualiza realmente o preço
   *
   * Cada evento dispara apenas UMA VEZ.
   */
  useEffect(() => {
    const offerElement = offerRef.current;
    const pricingElement = pricingRef.current;

    let offerTracked = false;
    let pricingTracked = false;

    /**
     * ================================
     * CHEGOU NA OFERTA
     * ================================
     */
    const offerObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (
          entry?.isIntersecting &&
                                   !offerTracked
) {
          offerTracked = true;

          track.section("offer");

          offerObserver.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    /**
     * ================================
     * VISUALIZOU O PREÇO
     * ================================
     */
    const pricingObserver =
      new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (
              entry?.isIntersecting &&
              !offerTracked
            ) {
            pricingTracked = true;

            track.pricingViewed();

            pricingObserver.disconnect();
          }
        },
        {
          threshold: 0.5,
        }
      );

    if (offerElement) {
      offerObserver.observe(
        offerElement
      );
    }

    if (pricingElement) {
      pricingObserver.observe(
        pricingElement
      );
    }

    return () => {
      offerObserver.disconnect();
      pricingObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={offerRef}
      id="oferta"
      className="section-y relative overflow-hidden bg-background-2"
    >
      <div
        className="glow-radial pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[760px] max-w-[150vw] -translate-x-1/2 opacity-50"
        aria-hidden
      />

      <div className="container-vsl relative">
        <Reveal>
          <div className="card-glow mx-auto max-w-3xl rounded-[1.75rem] bg-card p-5 text-center sm:p-8 md:p-10">

            {/* BADGE */}
            <span className="inline-block rounded-full bg-gradient-tech px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-primary-foreground">
              {o.badge}
            </span>

            {/* IMAGEM PRINCIPAL */}
            <div className="relative mx-auto mt-7 w-full max-w-[680px]">
              <div
                className="pointer-events-none absolute inset-[8%] rounded-[2rem] bg-sky/10 blur-3xl"
                aria-hidden
              />

              <SafeImage
                src={vslConfig.offerImage}
                alt={o.title}
                className="
                  relative
                  mx-auto
                  h-auto
                  w-full
                  max-h-[720px]
                  object-contain
                  drop-shadow-[0_20px_45px_rgba(0,0,0,0.45)]
                "
                placeholderClassName="aspect-[4/5] w-full"
              />
            </div>

            {/* TÍTULO */}
            <h2 className="mt-7 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              {o.title}
            </h2>

            {/* TEXTO */}
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {o.text}
            </p>

            {/* BENEFÍCIOS */}
            <ul className="mx-auto mt-8 grid max-w-xl gap-3 text-left sm:grid-cols-2">
              {o.items.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-2.5 text-sm font-medium leading-snug"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-cta"
                    aria-hidden
                  />

                  {it}
                </li>
              ))}
            </ul>

            {/* PREÇO */}
            <div
              ref={pricingRef}
              className="mt-10 border-t border-border pt-8"
            >
              <p className="text-sm text-muted-foreground">
                DE{" "}
                <span className="line-through">
                  {vslConfig.originalPrice}
                </span>
              </p>

              <p className="mt-2 font-display text-5xl font-black text-cta sm:text-6xl md:text-7xl">
                {vslConfig.cashPrice}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                OU {vslConfig.installments}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 flex justify-center">
              <PurchaseButton
                position="offer"
                fullWidth
              />
            </div>

            {/* SEGURANÇA */}
            <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock
                className="h-3.5 w-3.5"
                aria-hidden
              />

              {o.footnote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
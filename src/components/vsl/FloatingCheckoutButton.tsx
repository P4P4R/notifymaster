import { useEffect, useState } from "react";
import { vslConfig } from "@/config/vslConfig";
import { track } from "@/lib/tracking";
import { PurchaseButton } from "./PurchaseButton";
import { cn } from "@/lib/utils";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-8 w-8"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M16.05 4A11.76 11.76 0 0 0 6 21.86L4.38 28l6.28-1.64A11.94 11.94 0 1 0 16.05 4Zm0 21.72a9.79 9.79 0 0 1-4.99-1.36l-.36-.21-3.73.97.99-3.62-.23-.37a9.69 9.69 0 1 1 8.32 4.59Zm5.36-7.24c-.29-.15-1.74-.85-2.01-.95-.27-.1-.46-.15-.66.15-.19.29-.75.95-.92 1.14-.17.2-.34.22-.63.08-.3-.15-1.24-.46-2.36-1.46a8.83 8.83 0 0 1-1.63-2.03c-.17-.29-.02-.45.13-.59.13-.13.29-.34.44-.51.14-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.08-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.51.07-.78.36-.27.3-1.02 1-1.02 2.43s1.05 2.82 1.19 3.01c.15.2 2.05 3.13 4.97 4.39.69.3 1.23.48 1.66.61.69.22 1.33.19 1.83.12.56-.08 1.74-.71 1.98-1.39.25-.68.25-1.26.17-1.38-.07-.12-.26-.2-.55-.34Z"
      />
    </svg>
  );
}

export function FloatingCheckoutButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const pct =
        max > 0
          ? window.scrollY / max
          : 0;

      const offer =
        document
          .getElementById("oferta")
          ?.getBoundingClientRect();

      const offerInView = offer
        ? offer.top < window.innerHeight &&
          offer.bottom > 0
        : false;

      /**
       * Exibe o CTA flutuante depois de 12%
       * da página, exceto quando a oferta
       * principal estiver visível.
       *
       * NÃO dispara evento de scroll.
       */
      setVisible(
        pct > 0.12 &&
          !offerInView
      );
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  /**
   * Só mostra o WhatsApp se:
   *
   * - estiver habilitado
   * - houver uma URL http/https válida
   */
  const showWhatsapp =
    vslConfig.whatsappEnabled &&
    /^https?:\/\//.test(
      vslConfig.whatsappUrl
    );

  return (
    <>
      {/* ==================================
          CTA FLUTUANTE
          ==================================

          O PurchaseButton já dispara:

          Meta:
          - InitiateCheckout
          - CheckoutClicked

          position:
          - floating

          NÃO adicionamos outro evento aqui,
          evitando duplicação.
      */}
      {vslConfig.floatingButtonEnabled && (
        <div
          className={cn(
            "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-4 pt-3 backdrop-blur-md transition-transform duration-300 pb-safe md:inset-x-auto md:bottom-6 md:right-6 md:rounded-full md:border md:p-2",

            visible
              ? "translate-y-0"
              : "translate-y-[140%]"
          )}
        >
          <PurchaseButton
            position="floating"
            label="QUERO ACESSAR"
            size="md"
            className="h-14 w-full md:h-12 md:w-auto"
          />
        </div>
      )}

      {/* ==================================
          WHATSAPP FLUTUANTE
          ==================================

          Registra:

          WhatsAppClicked
          position = floating
      */}
      {showWhatsapp && (
        <a
          href={vslConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track.whatsapp(
              "floating"
            )
          }
          aria-label="Falar no WhatsApp"
          className={cn(
            "fixed right-4 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-cta text-cta-foreground shadow-[var(--shadow-cta)] transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:bottom-24 md:right-6 md:h-20 md:w-20",

            visible
              ? "bottom-24"
              : "bottom-6"
          )}
        >
          <WhatsAppIcon />

          <span className="absolute -right-0.5 -top-0.5 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-background bg-destructive px-1 text-xs font-bold text-destructive-foreground">
            1
          </span>
        </a>
      )}
    </>
  );
}
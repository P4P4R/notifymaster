import type { MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { vslConfig } from "@/config/vslConfig";
import { useCheckoutUrl } from "@/hooks/useCheckoutUrl";
import { track } from "@/lib/tracking";
import { isValidCheckoutUrl } from "@/utils/buildCheckoutUrl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type CtaPosition =
  | "hero"
  | "video"
  | "products"
  | "benefits"
  | "testimonials"
  | "offer"
  | "floating";

export function PurchaseButton({
  position,
  label = vslConfig.ctaLabel,
  className,
  fullWidth,
  size = "lg",
}: {
  position: CtaPosition;
  label?: string;
  className?: string;
  fullWidth?: boolean;
  size?: "lg" | "md";
}) {
  const { getUrl } = useCheckoutUrl();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const url = getUrl();

    // Primeiro valida o checkout.
    if (!isValidCheckoutUrl(url)) {
      e.preventDefault();

      console.warn(
        "[NotifyMaster] Configure vslConfig.checkoutUrl com o link da Kiwify."
      );

      return;
    }

    /**
     * Só registra checkout se a URL for válida
     * e o usuário realmente for enviado ao checkout.
     *
     * META:
     * - InitiateCheckout
     * - CheckoutClicked
     *
     * Também envia:
     * - site_name: notifymasteroficial.com
     * - position: hero / offer / floating etc.
     */
    track.checkout(position);

    // Atualiza o href com a URL final do checkout.
    e.currentTarget.href = url;
  };

  return (
    <Button
      asChild
      variant="cta"
      size={size === "lg" ? "cta" : "floating"}
      className={cn(
        "group w-full max-w-[380px] whitespace-normal px-4 text-center text-sm leading-tight transition-all sm:w-auto sm:text-lg",
        fullWidth && "w-full sm:w-full",
        className
      )}
    >
      <a
        href={vslConfig.checkoutUrl}
        onClick={onClick}
        data-position={position}
      >
        <span>{label}</span>

        <ArrowRight
          className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </a>
    </Button>
  );
}
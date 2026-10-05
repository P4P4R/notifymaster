import { useEffect } from "react";
import { vslConfig } from "@/config/vslConfig";
import { track } from "@/lib/tracking";
import { SafeImage } from "./shared";
import { PurchaseButton } from "./PurchaseButton";
import { TrustBadges } from "./TrustBadges";

function Headline() {
  const { headline, highlightedWords } = vslConfig;

  const word = highlightedWords.find((w) => headline.includes(w));

  if (!word) return <>{headline}</>;

  const [before, after] = headline.split(word);

  return (
    <>
      {before}
      <span className="text-gradient">{word}</span>
      {after}
    </>
  );
}

export function HeroVsl() {
  /**
   * Dispara uma única vez quando a página/VSL é visualizada.
   *
   * Meta:
   * - ViewContent
   * - VSLViewed
   *
   * Também envia:
   * - site_name: notifymasteroficial.com
   * - product_name
   * - value
   * - currency
   */
  useEffect(() => {
    track.vslViewed();
  }, []);

  return (
    <header className="relative overflow-hidden pb-10 pt-8 md:pb-16 md:pt-12">
      {/* Fundo tecnológico */}
      <div
        className="bg-tech-grid pointer-events-none absolute inset-0"
        aria-hidden
      />

      {/* Glow principal */}
      <div
        className="glow-radial pointer-events-none absolute left-1/2 top-[-10%] h-[520px] w-[720px] max-w-[140vw] -translate-x-1/2 opacity-60"
        aria-hidden
      />

      <div className="container-vsl relative">
        {/* LOGO */}
        <nav className="mb-10 flex items-center justify-center md:mb-14">
          <span className="font-display text-lg font-extrabold tracking-tight">
            Notify<span className="text-gradient">Master</span>
          </span>
        </nav>

        {/* CABEÇALHO */}
        <div className="mx-auto max-w-4xl text-center animate-in fade-in slide-in-from-bottom-3 duration-700">
          {/* BADGE */}
          <span className="inline-flex items-center gap-2 rounded-full border border-sky/25 bg-primary/10 px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-sky sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px] shadow-cyan" />
            {vslConfig.badge}
          </span>

          {/* HEADLINE */}
          <h1 className="mt-6 text-[1.85rem] font-black leading-[1.08] sm:text-5xl md:text-6xl">
            <Headline />
          </h1>

          {/* SUBHEADLINE */}
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            {vslConfig.subheadline}
          </p>
        </div>

        {/* MOCKUP PRINCIPAL */}
        <div className="relative mx-auto mt-10 w-[94%] max-w-5xl md:mt-14">
          <div
            className="glow-radial absolute inset-[5%] opacity-70"
            aria-hidden
          />

          <SafeImage
            src={vslConfig.heroImage}
            alt={vslConfig.productName}
            priority
            className="relative mx-auto h-auto w-full max-h-[620px] object-contain"
            placeholderClassName="relative aspect-[16/10]"
            placeholderLabel="Mockup principal — /images/notifymaster-hero.webp"
          />
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center md:mt-10">
          <PurchaseButton position="hero" />
        </div>

        {/* TRUST BADGES */}
        <div className="mt-4 md:mt-6">
          <TrustBadges />
        </div>
      </div>
    </header>
  );
}
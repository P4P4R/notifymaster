import { Check, X } from "lucide-react";
import { vslConfig } from "@/config/vslConfig";
import { Reveal, SectionHeading } from "./shared";
import { PurchaseButton } from "./PurchaseButton";

export function BeforeAfter() {
  return (
    <section className="section-y">
      <div className="container-vsl">
        <SectionHeading title="UMA FORMA MAIS ORGANIZADA DE ACESSAR SEUS MATERIAIS" />
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[1.25rem] border border-destructive/25 bg-destructive/5 p-6 md:p-8">
              <span className="text-xs font-bold tracking-[0.2em] text-destructive">ANTES</span>
              <ul className="mt-5 space-y-3.5">
                {vslConfig.before.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <X className="h-5 w-5 shrink-0 text-destructive" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card-glow h-full rounded-[1.25rem] bg-card p-6 md:p-8">
              <span className="text-xs font-bold tracking-[0.2em] text-cta">DEPOIS</span>
              <ul className="mt-5 space-y-3.5">
                {vslConfig.after.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm font-medium">
                    <Check className="h-5 w-5 shrink-0 text-cta" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <div className="mt-12 flex justify-center">
          <PurchaseButton position="benefits" />
        </div>
      </div>
    </section>
  );
}

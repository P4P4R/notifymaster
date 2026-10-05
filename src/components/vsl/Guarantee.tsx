import { CreditCard, Download, ShieldCheck, Lock } from "lucide-react";
import { vslConfig } from "@/config/vslConfig";
import { Reveal, SectionHeading } from "./shared";

export function Guarantee() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="container-vsl">
        <Reveal>
          <div className="mx-auto flex max-w-4xl items-center justify-center gap-3 rounded-lg border border-primary/40 bg-card px-5 py-5 text-center shadow-[var(--shadow-card)]">
            <ShieldCheck className="h-7 w-7 shrink-0 text-sky" aria-hidden />
            <p className="font-display text-sm font-bold sm:text-base">
              Sua compra é processada em ambiente protegido e conta com <span className="text-cta">{vslConfig.guaranteeDays} dias de garantia.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const secIcons = [CreditCard, Download, Lock];

export function Security() {
  return (
    <section className="section-y pb-8 md:pb-10">
      <div className="container-vsl">
        <SectionHeading title="COMPRA SEGURA" />
        <div className="grid gap-5 md:grid-cols-3">
          {vslConfig.security.map((s, i) => {
            const Icon = secIcons[i % secIcons.length] ?? ShieldCheck;
            return (
              <Reveal key={s.title} delay={i * 80}>
                <div className="card-surface h-full p-6">
                  <Icon className="h-6 w-6 text-sky" aria-hidden />
                  <h3 className="mt-4 font-display font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

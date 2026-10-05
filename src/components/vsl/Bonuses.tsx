import { Gift, Sparkles } from "lucide-react";
import { vslConfig } from "@/config/vslConfig";
import { Reveal, SafeImage, SectionHeading } from "./shared";

export function Bonuses() {
  return (
    <section className="section-y">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="OFERTA EXTRA"
          title="LEVE TAMBÉM O SIMULADOR PARA WHATSAPP"
        />

        <p className="mx-auto -mt-4 mb-10 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base md:mb-12">
          Crie mockups e demonstrações visuais com aparência profissional para
          apresentar seus materiais de forma mais clara e convincente.
        </p>

        <div className="mx-auto grid max-w-[820px] gap-6">
          {vslConfig.bonuses.map((b, i) => (
            <Reveal key={b.title} delay={i * 100}>
              <article className="card-surface group flex h-full flex-col overflow-hidden rounded-2xl">
                {/* IMAGEM */}
                <div className="relative flex w-full justify-center overflow-hidden bg-background-2 px-3 pt-4 sm:px-5 sm:pt-5">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky/5 to-transparent" />

                  <SafeImage
                    src={b.image}
                    alt={b.title}
                    className="
                      relative
                      mx-auto
                      h-auto
                      w-full
                      max-w-[620px]
                      object-contain
                      transition-transform
                      duration-300
                      group-hover:scale-[1.015]
                    "
                    placeholderClassName="aspect-[16/10] w-full max-w-[620px]"
                  />
                </div>

                {/* CONTEÚDO */}
                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-violet/20 px-3 py-1 text-[11px] font-bold tracking-wider text-sky">
                    <Gift className="h-3.5 w-3.5" aria-hidden />
                    EXTRA {i + 1}
                  </span>

                  <div className="mt-4 flex items-start gap-2">
                    <Sparkles
                      className="mt-0.5 h-5 w-5 shrink-0 text-cta"
                      aria-hidden
                    />

                    <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">
                      {b.title}
                    </h3>
                  </div>

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {b.description}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      {b.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {b.originalPrice}
                        </span>
                      )}

                      <span className="font-display text-lg font-extrabold text-cta sm:text-xl">
                        {b.currentPrice}
                      </span>
                    </div>

                
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
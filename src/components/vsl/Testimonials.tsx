import { vslConfig } from "@/config/vslConfig";
import { Reveal, SafeImage, SectionHeading } from "./shared";
import { PurchaseButton } from "./PurchaseButton";

export function Testimonials() {
  return (
    <section id="depoimentos" className="section-y bg-background-2">
      <div className="container-vsl">
        <SectionHeading eyebrow="DEMONSTRAÇÃO" title="VEJA O NOTIFYMASTER FUNCIONANDO NA PRÁTICA" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vslConfig.testimonials.map((src, i) => (
            <Reveal key={src} delay={(i % 3) * 80}>
              <div className="card-surface overflow-hidden p-2">
                <SafeImage
                  src={src}
                  alt={`Depoimento ${i + 1}`}
                  className="h-auto w-full rounded-xl"
                  placeholderClassName="aspect-[4/5]"
                  placeholderLabel="Adicione seu depoimento aqui"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">PRONTO PARA CONHECER O NOTIFYMASTER?</h2>
          <div className="mt-8 flex justify-center">
            <PurchaseButton position="testimonials" label="QUERO ACESSAR AGORA" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

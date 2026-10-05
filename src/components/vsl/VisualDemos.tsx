import { vslConfig } from "@/config/vslConfig";
import { Reveal, SafeImage, SectionHeading } from "./shared";

export function VisualDemos() {
  return (
    <section id="demonstracoes" className="section-y bg-background-2">
      <div className="container-vsl">
        <SectionHeading eyebrow="MOCKUPS" title="DEMONSTRAÇÕES VISUAIS" subtitle="Veja como os materiais são apresentados dentro do NotifyMaster." />
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-6">
          {vslConfig.demos.map((src, i) => (
            <Reveal key={src} delay={(i % 3) * 80} className="w-[82%] shrink-0 snap-center sm:w-auto">
              <div className="card-surface overflow-hidden p-2">
                <SafeImage src={src} alt={`Demonstração ${i + 1}`} className="aspect-[4/5] w-full rounded-xl" placeholderClassName="aspect-[4/5]" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

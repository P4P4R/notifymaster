import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { vslConfig } from "@/config/vslConfig";
import { SectionHeading } from "./shared";

export function FAQ() {
  return (
    <section className="section-y bg-background-2">
      <div className="container-vsl max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="PERGUNTAS FREQUENTES" />
        <Accordion type="single" collapsible className="space-y-3">
          {vslConfig.faq.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="card-surface border-b-0 px-5">
              <AccordionTrigger className="text-left font-display text-sm font-semibold hover:no-underline sm:text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

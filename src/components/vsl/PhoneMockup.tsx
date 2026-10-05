import { CheckCircle2 } from "lucide-react";
import { vslConfig } from "@/config/vslConfig";
import { Reveal, SafeImage } from "./shared";

export function PhoneMockup() {
  const s = vslConfig.phoneSection;
  return (
    <section className="section-y relative overflow-hidden">
      <div className="container-vsl grid items-center gap-12 md:grid-cols-2">
        <Reveal className="relative order-1 flex justify-center md:order-2">
          <div className="glow-radial absolute h-[420px] w-[420px] max-w-full opacity-80" aria-hidden />
          <SafeImage src={vslConfig.phoneImage} alt="NotifyMaster no celular" className="relative h-auto max-h-[560px] w-auto max-w-[70%] md:max-w-[80%]" placeholderClassName="relative aspect-[9/19] max-w-[240px]" />
        </Reveal>
        <Reveal className="order-2 md:order-1">
          <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">{s.title}</h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">{s.text}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {s.points.map((p) => (
              <div key={p} className="card-surface flex items-start gap-3 p-4 text-sm font-medium">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cta" aria-hidden />
                {p}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

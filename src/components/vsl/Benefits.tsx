import { FolderKanban, Key, MonitorSmartphone, RefreshCw, Search, Smartphone, type LucideIcon } from "lucide-react";
import { vslConfig } from "@/config/vslConfig";
import { Reveal, SectionHeading } from "./shared";

const icons: Record<string, LucideIcon> = {
  folder: FolderKanban,
  monitor: MonitorSmartphone,
  key: Key,
  search: Search,
  phone: Smartphone,
  refresh: RefreshCw,
};

export function Benefits() {
  return (
    <section className="section-y bg-background-2">
      <div className="container-vsl">
        <SectionHeading eyebrow="BENEFÍCIOS" title="VEJA O QUE VOCÊ GANHA AO ACESSAR O NOTIFYMASTER" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vslConfig.benefits.map((b, i) => {
            const Icon = icons[b.icon] ?? FolderKanban;
            return (
              <Reveal key={b.title} delay={(i % 3) * 80}>
                <div className="card-surface h-full p-6 transition-colors hover:border-sky/30">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky/25 bg-primary/15">
                    <Icon className="h-6 w-6 text-sky" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

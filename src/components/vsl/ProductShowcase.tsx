import { useEffect, useRef } from "react";
import { Package, Eye } from "lucide-react";
import { vslConfig } from "@/config/vslConfig";
import { track } from "@/lib/tracking";
import { Reveal, SafeImage, SectionHeading } from "./shared";
import { PurchaseButton } from "./PurchaseButton";

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let tracked = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (
          entry?.isIntersecting &&
          !tracked
        ) {
          tracked = true;

          /**
           * Registra quando a pessoa
           * realmente chega na seção de produtos.
           *
           * META:
           * ReachedProducts
           */
          track.section("products");

          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleDemoClick = (
    title: string,
    url: string
  ) => {
    /**
     * Evento para saber exatamente
     * qual demonstração foi clicada.
     */
    track.custom(
      "DemoClicked",
      {
        product_name: title,
        demo_url: url,
        position: "products",
      }
    );
  };

  return (
    <section
      ref={sectionRef}
      id="produtos"
      className="section-y"
    >
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <SectionHeading
          eyebrow="NOTIFYMASTER"
          title="+ RECURSOS + POSSIBILIDADES"
        />

        <div
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            2xl:grid-cols-5
          "
        >
          {vslConfig.products.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 80}
            >
              <article
                className="
                  card-surface
                  group
                  flex
                  h-full
                  flex-col
                  overflow-hidden
                  rounded-2xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                {/* IMAGEM */}
                <div className="relative overflow-hidden bg-background-2">
                  <span
                    className="
                      absolute
                      left-3
                      top-3
                      z-10
                      rounded-full
                      bg-gradient-tech
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      tracking-wider
                      text-primary-foreground
                    "
                  >
                    {p.badge}
                  </span>

                  <div
                    className="
                      flex
                      min-h-[320px]
                      w-full
                      items-center
                      justify-center
                      p-2
                      sm:min-h-[340px]
                      lg:min-h-[360px]
                      2xl:min-h-[330px]
                    "
                  >
                    <SafeImage
                      src={p.image}
                      alt={p.title}
                      className="
                        h-full
                        max-h-[380px]
                        w-full
                        object-contain
                        transition-transform
                        duration-300
                        group-hover:scale-[1.02]
                      "
                      placeholderClassName="min-h-[320px] w-full"
                    />
                  </div>
                </div>

                {/* TEXTO */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start gap-2">
                    <Package
                      className="mt-0.5 h-4 w-4 shrink-0 text-sky"
                      aria-hidden
                    />

                    <h3 className="font-display text-base font-bold leading-snug sm:text-lg">
                      {p.title}
                    </h3>
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>

                  {p.demoUrl && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        handleDemoClick(
                          p.title,
                          p.demoUrl
                        )
                      }
                      className="
                        mt-4
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-sky
                        transition-colors
                        hover:text-cyan
                      "
                    >
                      <Eye
                        className="h-4 w-4"
                        aria-hidden
                      />

                      Ver demonstração
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <PurchaseButton position="products" />
        </div>
      </div>
    </section>
  );
}
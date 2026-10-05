import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { HeroVsl } from "@/components/vsl/HeroVsl";
import { VideoPlayer } from "@/components/vsl/VideoPlayer";
import { PurchaseButton } from "@/components/vsl/PurchaseButton";
import { TrustBadges } from "@/components/vsl/TrustBadges";
import { ProductShowcase } from "@/components/vsl/ProductShowcase";
import { Benefits } from "@/components/vsl/Benefits";
import { Testimonials } from "@/components/vsl/Testimonials";
import { Bonuses } from "@/components/vsl/Bonuses";
import { Offer } from "@/components/vsl/Offer";
import { Guarantee, Security } from "@/components/vsl/Guarantee";
import { FAQ } from "@/components/vsl/FAQ";
import { Footer } from "@/components/vsl/Footer";
import { FloatingCheckoutButton } from "@/components/vsl/FloatingCheckoutButton";
import { SectionHeading } from "@/components/vsl/shared";
import { captureTrackingParams } from "@/hooks/useCheckoutUrl";
import { useScrollTracking, useSectionTracking } from "@/hooks/useScrollTracking";
import { getAnalyticsConfig } from "@/lib/ga.functions";
import { initTracking, track } from "@/lib/tracking";

export const Route = createFileRoute("/vsl")({
  loader: () => getAnalyticsConfig(),
  head: () => ({
    meta: [
      { title: "NotifyMaster APKs | Página Oficial" },
      { name: "description", content: "Conheça o NotifyMaster APKs e veja os materiais, mockups e demonstrações visuais disponíveis na oferta." },
      { property: "og:title", content: "NotifyMaster APKs | Página Oficial" },
      { property: "og:description", content: "Conheça o NotifyMaster APKs e veja os materiais, mockups e demonstrações visuais disponíveis na oferta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VslPage,
});

function VslPage() {
  const { gaId } = Route.useLoaderData();
  useScrollTracking();
  useSectionTracking();

  useEffect(() => {
    captureTrackingParams();
    initTracking(gaId);
    track.vslViewed();
  }, [gaId]);

  return (
    <main>
      <HeroVsl />
      <section className="section-y bg-background-2">
        <div className="container-vsl max-w-4xl">
          <SectionHeading title="VEJA O NOTIFYMASTER EM AÇÃO" subtitle="Assista à demonstração e veja exatamente como funciona antes de liberar seu acesso." />
          <VideoPlayer />
          <div className="mt-10 flex justify-center"><PurchaseButton position="video" /></div>
          <TrustBadges />
        </div>
      </section>
      {/* <ProductExplanation /> remover esta linha */}
      <ProductShowcase />
      {/* <VisualDemos /> */}
      <Benefits />
      {/*<BeforeAfter />*/}
      <Testimonials />
      <Bonuses />
      <Offer />
      <Security />
      <Guarantee />
      <FAQ />
      <Footer />
      <FloatingCheckoutButton />
    </main>
  );
}
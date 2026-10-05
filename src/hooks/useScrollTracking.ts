import { useEffect } from "react";
import { track } from "@/lib/tracking";

const THRESHOLDS = [25, 50, 75, 90] as const;

/** Fires each scroll-depth event once per page view. */
export function useScrollTracking() {
  useEffect(() => {
    const fired = new Set<number>();
    let ticking = false;
    const check = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      for (const t of THRESHOLDS) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          track.scroll(t);
        }
      }
      if (fired.size === THRESHOLDS.length) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/** Fires section events once when each section id enters the viewport. */
export function useSectionTracking() {
  useEffect(() => {
    const targets: [string, Parameters<typeof track.section>[0]][] = [
      ["produtos", "products"],
      ["demonstracoes", "demos"],
      ["depoimentos", "testimonials"],
      ["oferta", "offer"],
      ["fim-da-pagina", "bottom"],
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const found = targets.find(([id]) => id === e.target.id);
          if (found) track.section(found[1]);
          observer.unobserve(e.target);
        }
      },
      { threshold: 0.2 },
    );
    targets.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}

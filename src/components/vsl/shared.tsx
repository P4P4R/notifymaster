import { useEffect, useRef, useState, type ReactNode } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Image that shows an elegant placeholder when the file doesn't exist yet. */
export function SafeImage({
  src,
  alt,
  className,
  placeholderClassName,
  placeholderLabel,
  priority,
  fit = "contain",
}: {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  placeholderLabel?: string;
  priority?: boolean;
  fit?: "contain" | "cover";
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-sky/25 bg-card/60 p-6 text-center text-muted-foreground",
          placeholderClassName,
        )}
      >
        <ImageIcon className="h-7 w-7 text-sky/70" aria-hidden />
        <span className="text-xs font-medium">{placeholderLabel ?? alt}</span>
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn(fit === "contain" ? "object-contain" : "object-cover", className)}
    />
  );
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-revealed={shown} style={{ transitionDelay: `${delay}ms` }} className={cn("reveal", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      {eyebrow && (
        <span className="mb-4 inline-block rounded-full border border-sky/25 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-sky">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground md:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";

import { vslConfig } from "@/config/vslConfig";
import { track } from "@/lib/tracking";

export function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

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
           * realmente chegou ao final da página.
           *
           * META:
           * ReachedBottom
           *
           * Também envia:
           * site_name: notifymasteroficial.com
           */
          track.section("bottom");

          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleContactClick = () => {
    track.custom(
      "ContactClicked",
      {
        position: "footer",
        destination:
          vslConfig.footer.contactUrl,
      }
    );
  };

  return (
    <footer
      ref={footerRef}
      id="fim-da-pagina"
      className="border-t border-border bg-background pb-28 pt-12 md:pb-12"
    >
      <div className="container-vsl text-center">

        {/* LOGO */}
        <span className="font-display text-xl font-extrabold">
          Notify
          <span className="text-gradient">
            Master
          </span>
        </span>

        {/* LINKS */}
        <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">

          <Link
            to="/politica-de-privacidade"
            className="hover:text-foreground"
          >
            Política de Privacidade
          </Link>

          <Link
            to="/termos-de-uso"
            className="hover:text-foreground"
          >
            Termos de Uso
          </Link>

          {vslConfig.footer.contactUrl && (
            <a
              href={vslConfig.footer.contactUrl}
              onClick={handleContactClick}
              className="hover:text-foreground"
            >
              Contato
            </a>
          )}

        </nav>

        {/* COPYRIGHT */}
        <p className="mt-8 text-xs text-muted-foreground">
          © 2026 NotifyMaster. Todos os direitos reservados.
        </p>

      </div>
    </footer>
  );
}
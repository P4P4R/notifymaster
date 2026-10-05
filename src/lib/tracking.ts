/* eslint-disable @typescript-eslint/no-explicit-any */

import { trackingConfig } from "@/config/trackingConfig";
import { vslConfig } from "@/config/vslConfig";

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    ttq?: any;
  }
}

/**
 * IDENTIFICAÇÃO DESTE SITE
 *
 * IMPORTANTE:
 * No projeto antigo use outro valor, por exemplo:
 * const SITE_NAME = "receitasmilionarias.com";
 *
 * Assim os dois sites podem usar o MESMO Pixel da Meta.
 */
const SITE_NAME = "notifymasteroficial.com";

let initialized = false;
let gaId = "";

type Payload = Record<string, unknown>;

/**
 * Retorna informações gerais da página.
 * Elas ajudam a identificar exatamente de onde veio o evento.
 */
function pageData(): Payload {
  if (typeof window === "undefined") {
    return {
      site_name: SITE_NAME,
    };
  }

  return {
    site_name: SITE_NAME,
    page_url: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  };
}

/**
 * Adiciona script externo.
 */
function addScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/**
 * Inicializa todos os rastreadores configurados.
 *
 * IDs vazios são simplesmente ignorados.
 */
export function initTracking(runtimeGaId?: string) {
  if (initialized || typeof window === "undefined") return;

  initialized = true;

  gaId =
    trackingConfig.googleAnalyticsId ||
    runtimeGaId ||
    "";

  window.dataLayer = window.dataLayer || [];

  /**
   * =========================
   * GOOGLE TAG MANAGER
   * =========================
   */
  if (trackingConfig.gtmId) {
    window.dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });

    addScript(
      `https://www.googletagmanager.com/gtm.js?id=${trackingConfig.gtmId}`
    );
  }

  /**
   * =========================
   * GOOGLE ANALYTICS 4
   * =========================
   */
  if (gaId) {
    addScript(
      `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    );

    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };

    window.gtag("set", "developer_id.dZjgwMW", true);

    window.gtag("js", new Date());

    window.gtag("config", gaId, {
      site_name: SITE_NAME,
    });
  }

  /**
   * =========================
   * META PIXEL
   * =========================
   */
  if (trackingConfig.metaPixelId) {
    const n: any = function (...args: any[]) {
      n.callMethod
        ? n.callMethod(...args)
        : n.queue.push(args);
    };

    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];

    window.fbq = n;
    window._fbq = n;

    addScript(
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    /**
     * Mesmo Pixel utilizado nos dois sites.
     */
    window.fbq(
      "init",
      trackingConfig.metaPixelId
    );

    /**
     * PageView identificado como NotifyMaster.
     */
    window.fbq("track", "PageView", {
      ...pageData(),
      product_name: vslConfig.productName,
    });
  }

  /**
   * =========================
   * TIKTOK PIXEL
   * =========================
   */
  if (trackingConfig.tiktokPixelId) {
    const ttq: any = [];

    ttq.methods = [
      "page",
      "track",
      "identify",
      "instances",
      "debug",
      "on",
      "off",
      "once",
      "ready",
      "alias",
      "group",
      "enableCookie",
      "disableCookie",
    ];

    ttq.setAndDefer = (
      t: any,
      e: string
    ) => {
      t[e] = (...args: any[]) =>
        t.push([e, ...args]);
    };

    ttq.methods.forEach(
      (m: string) =>
        ttq.setAndDefer(ttq, m)
    );

    window.ttq = ttq;

    addScript(
      `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${trackingConfig.tiktokPixelId}&lib=ttq`
    );

    ttq.page();
  }
}

/**
 * =========================================
 * META
 * =========================================
 *
 * Todos os eventos enviados por esta função
 * recebem automaticamente:
 *
 * site_name
 * page_url
 * page_path
 * page_title
 */
const fb = (
  type: "track" | "trackCustom",
  name: string,
  data?: Payload
) => {
  try {
    window.fbq?.(
      type,
      name,
      {
        ...pageData(),
        ...data,
      }
    );
  } catch {
    /* noop */
  }
};

/**
 * =========================================
 * GOOGLE ANALYTICS
 * =========================================
 */
const ga = (
  name: string,
  data?: Payload
) => {
  try {
    if (!gaId) return;

    window.gtag?.(
      "event",
      name,
      {
        ...pageData(),
        ...data,
      }
    );
  } catch {
    /* noop */
  }
};

/**
 * =========================================
 * TIKTOK
 * =========================================
 */
const tt = (
  name: string,
  data?: Payload
) => {
  try {
    window.ttq?.track?.(
      name,
      {
        ...pageData(),
        ...data,
      }
    );
  } catch {
    /* noop */
  }
};

/**
 * =========================================
 * GOOGLE TAG MANAGER
 * =========================================
 */
const gtm = (
  event: string,
  data?: Payload
) => {
  try {
    if (!trackingConfig.gtmId) return;

    window.dataLayer?.push({
      event,
      site_name: SITE_NAME,
      product: vslConfig.productName,
      ...pageData(),
      ...data,
    });
  } catch {
    /* noop */
  }
};

/**
 * Dados padrão do produto.
 */
const productData = () => ({
  content_name: vslConfig.productName,
  product_name: vslConfig.productName,
  content_type: "product",
  currency: vslConfig.currency,
  value: vslConfig.productValue,
});

/**
 * ==========================================================
 * EVENTOS DO NOTIFYMASTER
 * ==========================================================
 */
export const track = {
  /**
   * Pessoa visualizou a apresentação / conteúdo principal.
   *
   * META:
   * ViewContent
   * VSLViewed
   */
  vslViewed() {
    fb(
      "track",
      "ViewContent",
      productData()
    );

    fb(
      "trackCustom",
      "VSLViewed",
      productData()
    );

    ga("view_item", {
      currency: vslConfig.currency,
      value: vslConfig.productValue,

      items: [
        {
          item_name:
            vslConfig.productName,
        },
      ],
    });

    tt(
      "ViewContent",
      productData()
    );

    gtm(
      "view_item",
      productData()
    );
  },

  /**
   * Scroll da página.
   *
   * Exemplo:
   * track.scroll(25)
   * track.scroll(50)
   * track.scroll(75)
   * track.scroll(90)
   */
  scroll(
    percent: 25 | 50 | 75 | 90
  ) {
    fb(
      "trackCustom",
      `Scrolled${percent}`,
      {
        scroll_percent: percent,
      }
    );

    ga(
      `scroll_${percent}`,
      {
        scroll_percent: percent,
      }
    );

    gtm(
      `scroll_${percent}`,
      {
        scroll_percent: percent,
      }
    );
  },

  /**
   * Pessoa chegou em uma seção específica.
   */
  section(
    name:
      | "products"
      | "demos"
      | "testimonials"
      | "offer"
      | "bottom"
  ) {
    const map = {
      products: [
        "ReachedProducts",
        "view_products",
      ],

      demos: [
        "ReachedDemos",
        "view_demos",
      ],

      testimonials: [
        "ReachedTestimonials",
        "view_testimonials",
      ],

      offer: [
        "ReachedOffer",
        "view_offer",
      ],

      bottom: [
        "ReachedBottom",
        "reached_bottom",
      ],
    } as const;

    const [
      metaEvent,
      analyticsEvent,
    ] = map[name];

    fb(
      "trackCustom",
      metaEvent,
      {
        section: name,
      }
    );

    ga(
      analyticsEvent,
      {
        section: name,
      }
    );

    gtm(
      analyticsEvent,
      {
        section: name,
      }
    );
  },

  /**
   * Pessoa chegou especificamente na área
   * onde aparece o preço.
   *
   * USE quando a seção de preço entrar na tela.
   */
  pricingViewed() {
    fb(
      "trackCustom",
      "PricingViewed",
      {
        ...productData(),
        section: "pricing",
      }
    );

    ga(
      "pricing_viewed",
      {
        ...productData(),
        section: "pricing",
      }
    );

    gtm(
      "pricing_viewed",
      {
        ...productData(),
        section: "pricing",
      }
    );
  },

  /**
   * Clique no botão de compra.
   *
   * POSITION permite descobrir exatamente
   * qual botão gerou o checkout.
   *
   * Exemplos:
   *
   * track.checkout("hero")
   * track.checkout("pricing")
   * track.checkout("floating")
   * track.checkout("bottom")
   */
  checkout(position: string) {
    /**
     * Evento padrão importante para otimização
     * de campanhas da Meta.
     */
    fb(
      "track",
      "InitiateCheckout",
      {
        ...productData(),
        position,
      }
    );

    /**
     * Evento personalizado para saber
     * qual botão foi clicado.
     */
    fb(
      "trackCustom",
      "CheckoutClicked",
      {
        ...productData(),
        position,
      }
    );

    ga(
      "begin_checkout",
      {
        position,

        currency:
          vslConfig.currency,

        value:
          vslConfig.productValue,

        items: [
          {
            item_name:
              vslConfig.productName,
          },
        ],
      }
    );

    tt(
      "ClickButton",
      {
        ...productData(),
        position,
      }
    );

    tt(
      "InitiateCheckout",
      productData()
    );

    gtm(
      "begin_checkout",
      {
        ...productData(),
        position,
      }
    );
  },

  /**
   * Clique no WhatsApp.
   *
   * Agora você pode identificar QUAL botão.
   *
   * Exemplos:
   *
   * track.whatsapp("header")
   * track.whatsapp("hero")
   * track.whatsapp("offer")
   * track.whatsapp("footer")
   */
  whatsapp(
    position: string = "unknown"
  ) {
    fb(
      "trackCustom",
      "WhatsAppClicked",
      {
        position,
      }
    );

    ga(
      "whatsapp_click",
      {
        position,
      }
    );

    tt(
      "Contact",
      {
        position,
      }
    );

    gtm(
      "whatsapp_click",
      {
        position,
      }
    );
  },

  /**
   * COMPRA CONFIRMADA
   *
   * ATENÇÃO:
   *
   * NÃO chame esta função no botão Comprar.
   *
   * Ela só deve rodar depois que o pagamento
   * realmente tiver sido confirmado.
   *
   * Exemplo:
   *
   * track.purchase("PEDIDO-123")
   */
  purchase(
    orderId?: string
  ) {
    const data = {
      ...productData(),

      ...(orderId
        ? {
            order_id: orderId,
          }
        : {}),
    };

    /**
     * Evento padrão de compra da Meta.
     */
    fb(
      "track",
      "Purchase",
      data
    );

    /**
     * GA4
     */
    ga(
      "purchase",
      {
        transaction_id:
          orderId ||
          `notifymaster-${Date.now()}`,

        currency:
          vslConfig.currency,

        value:
          vslConfig.productValue,

        items: [
          {
            item_name:
              vslConfig.productName,

            price:
              vslConfig.productValue,

            quantity: 1,
          },
        ],
      }
    );

    /**
     * TikTok
     */
    tt(
      "CompletePayment",
      data
    );

    /**
     * GTM
     */
    gtm(
      "purchase",
      data
    );
  },

  /**
   * Evento personalizado genérico.
   *
   * Serve caso queira adicionar algum
   * rastreamento novo futuramente.
   *
   * Exemplo:
   *
   * track.custom(
   *   "ClickedDemo",
   *   { demo: "nubank" }
   * )
   */
  custom(
    eventName: string,
    data?: Payload
  ) {
    fb(
      "trackCustom",
      eventName,
      data
    );

    ga(
      eventName,
      data
    );

    gtm(
      eventName,
      data
    );
  },
};
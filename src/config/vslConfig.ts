// =====================================================
// NOTIFYMASTER — CONFIGURAÇÃO CENTRAL DA VSL
// Troque textos, imagens, preços e links somente aqui.
// =====================================================

export type VideoType = "youtube" | "vimeo" | "mp4" | "embed";

export const vslConfig = {
  productName: "NotifyMaster APKs",
  brandName: "NotifyMaster",

  badge: "QUALIDADE • CONFIANÇA",
  headline: "TENHA ACESSO AO NOTIFYMASTER APKs EM UM ÚNICO LUGAR",
  highlightedWords: ["NOTIFYMASTER APKs"],
  subheadline:
    "Eleve seu nível com o NotifyMaster APKs. Crie mockups e demonstrações visuais profissionais para stories, anúncios e WhatsApp, aumentando a confiança, a autoridade e potencializando suas vendas.",
  heroBullets: ["Conteúdo digital", "Acesso organizado", "Mockups profissionais", "Demonstrações visuais"],

  // ================================
  // IMAGENS (substitua os arquivos em /public/images)
  // ================================
  logo: "/images/logo-notifymaster.webp",
  heroImage: "/images/NotifyMaster_ Notificações de Vendas.png",
  productImage: "/images/notifymaster-product.webp",
  offerImage: "/images/notifymaster1.png",
  phoneImage: "/images/notifymaster-phone.webp",
  guaranteeImage: "/images/guarantee.webp",
  ogImage: "/images/og-notifymaster.webp",

  // ================================
  // VÍDEO
  // ================================
  videoUrl: "https://youtube.com/shorts/OJ239QSqHtA", // link do YouTube, Vimeo, .mp4 ou URL de embed
  videoType: "youtube" as VideoType,
  videoPoster: "/images/notifymaster1.png",

  // ================================
  // CHECKOUT
  // ================================
  checkoutUrl: "https://pay.kiwify.com.br/ZiXESbG",
  preserveUtms: true,

  // ================================
  // WHATSAPP
  // ================================
  whatsappEnabled: true,
  whatsappUrl:
    "https://api.whatsapp.com/send/?phone=5543988413362&text=Ol%C3%A1%2C+vim+pela+p%C3%A1gina+do+NotifyMaster+APKs+e+gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+os+APKs.&type=phone_number&app_absent=0",

  // ================================
  // PREÇOS
  // ================================
  originalPrice: "R$ 59,90",
  cashPrice: "R$ 9,90",
  productValue: 0, // valor numérico enviado aos pixels (ex: 47.9)
  currency: "BRL",

  guaranteeDays: 7,
  floatingButtonEnabled: true,

  ctaLabel: "LIBERAR MEU ACESSO AGORA",

  trustBadges: ["Compra segura", "Acesso digital", "Pagamento protegido", "Liberação após confirmação"],

  explanation: {
    title: "CONHEÇA O NOTIFYMASTER APKs",
    text: "O NotifyMaster reúne os materiais digitais em um ambiente organizado para facilitar o acesso e a visualização de cada conteúdo.",
    points: ["APKs reunidos em um só produto", "Mockups para visualizar cada material", "Demonstrações para conhecer antes de usar"],
  },

  products: [
    { title: "NotifyMaster APK Kiwify", description: "Visualize alertas de vendas e aprovações de pagamentos da Kiwify.", image: "/images/NotifyMasterKIWIFY.png", badge: "APK", demoUrl: "" },
    { title: "NotifyMaster APK Hotmart", description: "Visualize alertas de vendas e aprovações de pagamentos da Hotmart.", image: "/images/NotifyMasterHOT.png", badge: "APK", demoUrl: "" },
    { title: "NotifyMaster APK Picpay", description: "Tenha alertas visuais de pagamentos Pix na Picpay.", image: "/images/NotifyMasterPICPAY.png", badge: "APK", demoUrl: "" },
    { title: "NotifyMaster APK Nubank", description: "Tenha alertas visuais de pagamentos Pix na Nubank.", image: "/images/NotifyMasterNUBANK.png", badge: "APK", demoUrl: "" },
    { title: "NotifyMaster APK RecargaPay", description: "Tenha alertas visuais de pagamentos Pix na RecargaPay.", image: "/images/NotifyMasterRECARGAPAY.png", badge: "APK", demoUrl: "" },
  ],

 benefits: [
    { 
      icon: "folder", 
      title: "ARSENAL COMPLETO E ORGANIZADO", 
      text: "Chega de procurar arquivos espalhados. Tenha todas as ferramentas de conversão reunidas em um único ecossistema estratégico." 
    },
    { 
      icon: "monitor", 
      title: "VISUALIZAÇÃO DE ALTA PERFORMANCE", 
      text: "Domine a arte da prova social com mockups profissionais que saltam aos olhos e forçam o cliente a desejar seu produto." 
    },
    { 
      icon: "key", 
      title: "ACESSO INSTANTÂNEO", 
      text: "Sem espera. Assim que o pagamento for confirmado, a venda é liberada automaticamente no seu e-mail." 
    },
    { 
      icon: "search", 
      title: "AGILIDADE NA IMPLEMENTAÇÃO", 
      text: "Estrutura intuitiva desenhada para que você encontre a ferramenta certa e comece a gerar resultados em poucos minutos." 
    },
    { 
      icon: "phone", 
      title: "SEU NEGÓCIO NA PALMA DA MÃO", 
      text: "Gerencie suas provas sociais e crie seus gatilhos de venda de qualquer lugar." 
    },
    { 
      icon: "refresh", 
      title: "EVOLUÇÃO CONSTANTE", 
      text: "O mercado muda e nós evoluímos com ele. Receba atualizações exclusivas e novas ferramentas para se manter sempre à frente da concorrência." 
    },
],


  before: ["Arquivos espalhados", "Dificuldade para encontrar materiais", "Falta de demonstrações", "Conteúdo sem organização", "Informações em lugares diferentes", "Visualização confusa"],
  after: ["Materiais organizados", "Demonstrações visuais", "Mockups profissionais", "Informações centralizadas", "Acesso simplificado", "Estrutura profissional"],

  // Somente depoimentos reais. Imagens ausentes mostram um espaço reservado.
  testimonials: [
    "/images/Notificações Kiwify na Tela Bloqueada.png",
    "/images/Central de Notificações Hotmart.png",
    "/images/Notificações Nubank na varanda urbana.png",
  ],

  bonuses: [
    {
      title: "OFERTA EXTRA",
      description: "Adicione um recurso extra para criar apresentações visuais mais profissionais e valorizar ainda mais o uso do NotifyMaster.",
      image: "/images/Simulador para WhatsApp com Mockups.png",
      originalPrice: "",
      currentPrice: "POR APENAS R$ 19,90 NO CHECKOUT",
    },
  ],

  offer: {
    badge: "ACESSO AO NOTIFYMASTER",
    title: "NotifyMaster APKs",
    text: "Tenha acesso ao pacote NotifyMaster e aos materiais apresentados nesta oferta.",
    items: ["Acesso aos APKs incluídos nesta oferta", 
            "Mockups profissionais", 
            "Demonstrações visuais", 
            "Conteúdo digital organizado", 
            "Liberação após a confirmação do pagamento", 
            "Suporte conforme condições da oferta"],
    footnote: "Pagamento seguro • Liberação após confirmação",
  },

  security: [
    { title: "Pagamento protegido", text: "Seus dados de pagamento são processados pela plataforma responsável pelo checkout." },
    { title: "Acesso digital", text: "Você receberá as informações de acesso conforme as condições apresentadas na compra." },
    { title: "Ambiente seguro", text: "Utilizamos conexão segura para proteger a navegação." },
  ],

  faq: [
  {
    q: "O que é o NotifyMaster?",
    a: "O NotifyMaster é um pacote digital com APKs, mockups e demonstrações visuais reunidos em um único acesso."
  },
  {
    q: "Como recebo o acesso?",
    a: "Após a confirmação do pagamento, as instruções de acesso são enviadas para o e-mail informado no checkout."
  },
  {
    q: "O produto é digital?",
    a: "Sim. Todo o conteúdo é digital e nenhum material físico será enviado."
  },
  {
    q: "O que está incluído?",
    a: "Você recebe os APKs e materiais apresentados na oferta, além dos conteúdos extras indicados na página."
  },
  {
    q: "Como funcionam os APKs?",
    a: "Cada APK possui sua própria finalidade e compatibilidade. As informações e demonstrações ajudam você a entender o funcionamento antes do uso."
  },
  {
    q: "Posso acessar pelo celular?",
    a: "Sim. A área de acesso pode ser consultada por celular, tablet ou computador."
  },
  {
    q: "Existe garantia?",
    a: "Sim. A compra segue as condições de garantia informadas no checkout."
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "As opções disponíveis, como Pix ou cartão, são exibidas diretamente no checkout."
  },
  {
    q: "Como funciona o suporte?",
    a: "O suporte é realizado pelos canais informados após a compra."
  },
  {
    q: "O acesso é imediato?",
    a: "O acesso é liberado após a confirmação do pagamento pela plataforma."
  }
],

  footer: {
    contactUrl:
      "https://api.whatsapp.com/send/?phone=5543988413362&text=Ol%C3%A1%2C+vim+pela+p%C3%A1gina+do+NotifyMaster+APKs+e+gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+os+APKs.&type=phone_number&app_absent=0",
  },
};

import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | NotifyMaster" },
      { name: "description", content: "Política de Privacidade da página oficial NotifyMaster APKs." },
      { property: "og:title", content: "Política de Privacidade | NotifyMaster" },
      { property: "og:description", content: "Saiba como a NotifyMaster trata dados e informações de navegação." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background py-12 md:py-20">
      <article className="container-vsl max-w-3xl">
        <Link to="/vsl" className="text-sm font-semibold text-sky hover:text-cyan">← Voltar ao NotifyMaster</Link>
        <h1 className="mt-8 text-3xl font-black sm:text-4xl">Política de Privacidade</h1>
        <p className="mt-3 text-sm text-muted-foreground">Última atualização: 5 de outubro de 2026.</p>
        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
          <section><h2 className="text-xl font-bold text-foreground">1. Informações coletadas</h2><p className="mt-2">Podemos coletar informações fornecidas voluntariamente em contatos e dados técnicos de navegação, como dispositivo, páginas acessadas, origem da visita e identificadores de campanha.</p></section>
          <section><h2 className="text-xl font-bold text-foreground">2. Uso das informações</h2><p className="mt-2">As informações podem ser utilizadas para disponibilizar a página, medir seu desempenho, melhorar a experiência, atender solicitações e acompanhar campanhas.</p></section>
          <section><h2 className="text-xl font-bold text-foreground">3. Cookies e ferramentas de medição</h2><p className="mt-2">Esta página pode usar cookies e tecnologias semelhantes de plataformas de análise e publicidade quando estiverem configuradas. Essas ferramentas podem registrar interações e origem da visita.</p></section>
          <section><h2 className="text-xl font-bold text-foreground">4. Pagamento</h2><p className="mt-2">O pagamento é processado por uma plataforma externa. Não armazenamos os dados completos do seu cartão nesta página. Consulte também as políticas apresentadas no checkout.</p></section>
          <section><h2 className="text-xl font-bold text-foreground">5. Compartilhamento e segurança</h2><p className="mt-2">As informações são compartilhadas apenas quando necessário para operar, medir e proteger o serviço, ou quando exigido por lei. Adotamos medidas razoáveis para proteger a navegação.</p></section>
          <section><h2 className="text-xl font-bold text-foreground">6. Seus direitos</h2><p className="mt-2">Você pode solicitar informações, correção ou exclusão de dados pessoais pelos canais oficiais de contato informados na oferta ou após a compra.</p></section>
        </div>
      </article>
    </main>
  );
}
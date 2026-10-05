import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({
    meta: [
      { title: "Termos de Uso | NotifyMaster" },
      { name: "description", content: "Termos aplicáveis ao uso da página e do produto digital NotifyMaster APKs." },
      { property: "og:title", content: "Termos de Uso | NotifyMaster" },
      { property: "og:description", content: "Condições aplicáveis ao uso da página e do produto digital NotifyMaster APKs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="min-h-screen bg-background py-12 md:py-20">
      <article className="container-vsl max-w-3xl">
        <Link to="/vsl" className="text-sm font-semibold text-sky hover:text-cyan">← Voltar ao NotifyMaster</Link>
        <h1 className="mt-8 text-3xl font-black sm:text-4xl">Termos de Uso</h1>
        <p className="mt-3 text-sm text-muted-foreground">Última atualização: 5 de outubro de 2026.</p>
        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
          <section><h2 className="text-xl font-bold text-foreground">1. Aceitação</h2><p className="mt-2">Ao navegar nesta página ou adquirir o produto, você declara ter lido e aceitado estes termos e as condições apresentadas no checkout.</p></section>
          <section><h2 className="text-xl font-bold text-foreground">2. Produto digital</h2><p className="mt-2">O NotifyMaster APKs é um produto digital. Nenhum material físico será enviado. O conteúdo efetivamente incluído é aquele descrito na oferta vigente no momento da compra.</p></section>
          <section><h2 className="text-xl font-bold text-foreground">3. Acesso e compatibilidade</h2><p className="mt-2">O acesso é liberado após a confirmação do pagamento. A compatibilidade pode variar conforme o material, versão do sistema e dispositivo utilizado.</p></section>
          <section><h2 className="text-xl font-bold text-foreground">4. Uso permitido</h2><p className="mt-2">O acesso é pessoal, salvo indicação diferente na oferta. É proibida a reprodução, revenda, distribuição ou disponibilização não autorizada dos materiais.</p></section>
          <section><h2 className="text-xl font-bold text-foreground">5. Pagamento e garantia</h2><p className="mt-2">Pagamento, parcelamento, prazo de confirmação, garantia e eventual reembolso seguem as condições exibidas pela plataforma responsável pelo checkout.</p></section>
          <section><h2 className="text-xl font-bold text-foreground">6. Alterações</h2><p className="mt-2">Estes termos podem ser atualizados para refletir mudanças no produto ou exigências legais. A versão vigente permanecerá publicada nesta página.</p></section>
        </div>
      </article>
    </main>
  );
}
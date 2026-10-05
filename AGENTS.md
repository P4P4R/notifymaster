<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep all editable VSL content and commercial settings in `src/config/vslConfig.ts` so every CTA and section stays consistent.
- Keep tracking provider IDs in `src/config/trackingConfig.ts`; the GA4 secret may override its empty setting through a server function.

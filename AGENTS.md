<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust

Next.js 16.4 App Router app (TypeScript, `src/` layout, Tailwind v4, shadcn). Still a fresh create-next-app scaffold — no custom app code yet besides the shadcn UI kit. Path alias: `@/*` → `src/*`.

## Deliberate config flags

All in `next.config.ts`; don't remove or "fix" them silently:

- `cacheComponents` + `partialPrefetching` — the v16 Cache Components model (caching via `"use cache"`, `cacheLife`/`cacheTag`; invalidation via `revalidateTag`/`updateTag`/`refresh`).
- `reactCompiler` — React Compiler is on: manual `useMemo`/`useCallback`/memoization is usually unnecessary.
- `experimental.agentFeedback` — authorizes `next dev` to maintain the Next.js block above.
- `turbopack.rules` drives the CSS build (`@tailwindcss/turbopack`) — do not add webpack/postcss overrides for styling; dev and build are Turbopack-only.

## Commands

- `npm run dev` / `npm run build` / `npm start`
- `npm run lint` — plain ESLint 9 (flat config). `next lint` no longer exists, and `next build` no longer runs linting — lint is a separate step.
- `npx tsc --noEmit` — no typecheck script. Built-in route types (`PageProps<'/x'>`, `LayoutProps<'/x'>`, `RouteContext<'/x'>`) are generated into `.next/dev/types` / `.next/types`, so run dev or build before typechecking or tsc fails on route props.
- No tests, CI, or env files exist yet.

For lint/typecheck verification: `npm run lint` → `npm run build` (also generates route types) → `npx tsc --noEmit`.

## UI stack specifics

- shadcn style is `base-nova` (see `components.json`): components in `src/components/ui` import from `@base-ui/react/*`, **not** Radix UI. Don't write Radix-based shadcn code from memory — mirror existing component imports.
- `cn` comes from the `cn` npm package (re-exported by `src/lib/utils.ts`), not clsx/tailwind-merge.
- Add new primitives with the shadcn CLI (`npx shadcn add <name>`); icons are `lucide-react`.
- Tailwind v4 is CSS-first: design tokens and animation (`tw-animate-css`) live in `src/app/globals.css` via `@theme`; there is no `tailwind.config`.

## Next 16 gotchas vs. older habits

Coverage doc: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`.

- `params`, `searchParams`, `cookies()`, `headers()`, and sitemap `id` are async — await them.
- The request interception file convention is `proxy.ts`, not `middleware.ts`.
- `next/image` defaults changed (qualities, `minimumCacheTTL`, local IP restriction, local images must not include query strings).

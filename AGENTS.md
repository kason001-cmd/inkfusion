# Repository Guidelines

## Project Structure & Module Organization
- `app/` drives the Next 16 shell; add routes/segments here via new folders or files beside `layout.tsx` and `page.tsx`.
- Section-level UI lives in `components/`, while a reusable primitives catalog is organized under `components/ui/` (buttons, dialogs, grids, etc.).
- Shared logic and state helpers go under `lib/`, `hooks/`, and `contexts/`, with `lib/i18n.tsx` and `lib/translations.ts` powering localization.
- Global styles remain in `styles/globals.css`, static assets in `public/`, and `components.json` mirrors the landing page slices—keep it in sync when adding or removing sections.

## Build, Test, and Development Commands
- `pnpm dev` boots Next.js with hot reload for the app and API routes.
- `pnpm build` compiles the project ahead of deployment and catches production-only errors.
- `pnpm start` serves the output created by `pnpm build`.
- `pnpm lint` runs `eslint .` and should pass before merging.

## Coding Style & Naming Conventions
- Code uses TypeScript with PascalCase components, camelCase hooks/helpers, and `@/` path aliases defined in `tsconfig.json`.
- Follow the two-space indentation and grouped imports shown in `app/page.tsx`; keep logic in `lib/` or `hooks/` and JSX in `components/`.
- Compose classes with `clsx`/`tailwind-merge` and limit new CSS to `globals.css` unless component-scoped styles are required.
- Name primitives in `components/ui/` consistently (e.g., `Button`, `ButtonGroup`, `Dialog`) and keep their props stable to avoid frequent client re-renders.

## Testing Guidelines
- There are no automated tests yet; add new specs under `tests/` or `__tests__/` alongside the feature you modify.
- Prefer `*.test.tsx` for UI and `*.test.ts` or `*.spec.ts` for utilities.
- Document any manual verification steps (viewport sizes, locales, data scenarios) directly in the PR when coverage is limited.

## Commit & Pull Request Guidelines
- The repo currently lacks history; use descriptive, imperative commits such as `feat: add localized hero copy` or `fix: prevent toast overlap` once git is initialized.
- PRs should explain what changed, link related issue/ticket IDs, list commands used, and attach screenshots for visual updates.
- Mention any config or environment changes reviewers must run locally (e.g., new env vars or feature flags).

## Security & Configuration Tips
- Keep secrets out of version control; place runtime keys in `.env.local` and reference them via `process.env` in server components.
- After editing `next.config.mjs`, tailwind, or postcss settings, rerun `pnpm build` to confirm the configuration succeeds.

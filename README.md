# Reflection Calendar Frontend

Reflection Calendar is a small React + TypeScript application built with Vite and styled with Tailwind. It renders a “temporal mirror” that helps users review current dates against mirrored counterparts for journaling experiments.

## Quick Start

```bash
npm install          # install dependencies
npm run dev          # start Vite dev server (http://localhost:5173)
```

To produce a production build and preview it locally:

```bash
npm run build        # type-check + bundle to dist/
npm run preview      # serve dist/ for smoke testing
```

## Project Structure

- `src/` – React components, hooks, and utilities (see `src/utils/dateMirror.ts`).
- `public/` – static assets copied as-is into the final build.
- `tests/` – Node test runner specs that exercise the mirror logic.
- `build-tests/` – toy apps for reproducing bugs or experimenting outside the main build.
- `tailwind.config.js`, `postcss.config.js`, `tsconfig*.json`, `vite.config.*` – configuration at the repo root for visibility.

## Development Notes

- Tailwind layers are declared in `src/index.css`; customize theme tokens via `tailwind.config.js`.
- The TypeScript compiler runs in build/test scripts (`tsc -b`, `tsc -p tsconfig.test.json`) to keep runtime fast.
- Node 20+ and npm 10+ are recommended; lockfile is committed for deterministic installs.

## Testing

```bash
npm test             # compile test TS config and run node --test
```

Tests live under `tests/` (e.g., `tests/mirror.test.js`) and use Node’s built-in test runner. Add regression coverage alongside any new utility or component behavior, mirroring file names such as `mirror.test.ts`.

## Contributing

1. Fork and branch from `main`.
2. Make focused commits with imperative messages (`Add mirror utility parsing`).
3. Run `npm test` and include relevant screenshots for UI changes in pull requests.
4. Reference any related issues in the PR description and call out environment/config updates.

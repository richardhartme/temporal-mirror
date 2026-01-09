# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/` (React components, hooks, and utilities) with Tailwind styles in `src/index.css`. Static assets for the Vite dev server belong in `public/`. Integration-style experiments or repros live under `build-tests/` and mirror the real app directory structure. Node-based unit tests sit in `tests/`, and config files (Vite, Tailwind, multiple `tsconfig` variants) stay at the repo root for easy edits.

## Build, Test, and Development Commands
- `npm run dev` — start Vite with hot module reloading at `http://localhost:5173`.
- `npm run build` — type-check via `tsc -b` and produce optimized assets in `dist/`.
- `npm run preview` — locally serve the production build for smoke testing.
- `npm test` — compile the test `tsconfig` and run Node’s built-in test runner on `tests/mirror.test.js`.
All commands assume Node 20+ and npm 10+.

## Coding Style & Naming Conventions
Follow TypeScript-first React patterns: components and hooks in `.tsx`, utilities in `.ts`. Use 2-space indentation, trailing commas, and single quotes in JSX attributes to match existing files. Components should be `PascalCase`, hooks/utilities `camelCase`, and test files `*.test.js` or `*.test.ts`. Favor functional components with hooks, Tailwind utility classes in JSX, and colocate helper modules under `src/utils/`.

## Testing Guidelines
Use Node’s native test runner (`node --test`) as wired through `npm test`. Each feature or helper should include a mirror test in `tests/`, using descriptive `test('renders reflection panel', ...)` blocks. Keep tests deterministic; mock only what the standard library cannot provide. When fixing bugs, add regression tests before committing.

## Commit & Pull Request Guidelines
Write commits in the imperative mood (`Add mirror date utility`) and keep related changes together. Reference issue IDs in the body when applicable. Pull requests should include: a short summary, screenshots for UI changes, test output (`npm test`) pasted inline, and notes about any config or environment updates (`.env*`). Keep PRs under ~400 lines touched to simplify review; split larger efforts into stacked branches when needed.

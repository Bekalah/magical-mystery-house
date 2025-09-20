Testing Library and Framework:
- This repository uses Node's built-in test runner (node:test) with ESM (.mjs) modules for the palette tests created here.
- Run with: node --test
- No additional dependencies are required. If your project standardizes on Jest or Vitest, you can translate the imports accordingly and keep the same assertions and structure.

Notes:
- The tests validate the schema (bg, ink, layers), color formats, uniqueness, and WCAG-inspired contrast thresholds.
- The palette fixture lives at tests/fixtures/palette.json and mirrors the diff content provided.
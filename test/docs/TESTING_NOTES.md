Testing framework note (as of September 20, 2025):
- These tests are authored in ESM and are compatible with Vitest (recommended) or Jest configured for ESM with a jsdom environment.
- No new dependencies are required if your project already uses jsdom via the test runner.
- If running directly with Node, you must provide a DOM (e.g., jsdom). The tests include a minimal shim, but a real test runner is expected.
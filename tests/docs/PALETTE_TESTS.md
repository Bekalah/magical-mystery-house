This repository's palette tests use Jest and attempt to load a palette.json file.

Detected palette path at generation time: /home/jailuser/git/data/palette.json

If your palette file moves, set the environment variable TARGET_PALETTE_PATH to the new path when running tests, e.g.:

  TARGET_PALETTE_PATH="/home/jailuser/git/data/palette.json" npm test

or update resolvePalettePath() in tests/palette.test.js accordingly.
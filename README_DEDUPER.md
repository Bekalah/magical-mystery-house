Per Texturas Numerorum, Spira Loquitur.  //

# Duplicate Line Cleaner

This repo may collect accidental duplicate lines. Run `node tools/dedupe.mjs` to clean text files.

```sh
node tools/dedupe.mjs       # removes consecutive duplicate lines
node tools/dedupe.mjs --check  # report only
```

Safe to run offline; skips `.git` and binary files.

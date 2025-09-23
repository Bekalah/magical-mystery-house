// verify-absent.mjs
// ND-safe guard: fail build if forbidden PNG masters resurface.
import { existsSync } from 'node:fs';

const tombs = ['site/assets/art/black-madonna-master.png'];
const risen = tombs.filter((path) => existsSync(path));

if (risen.length > 0) {
  console.error('PROTECT violation: undead asset(s) present:', risen);
  process.exit(1);
}

console.log('Guard ok — no undead assets detected.');

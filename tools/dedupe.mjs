import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// dedupeLines: remove consecutive duplicate lines
export function dedupeLines(lines) {
  const out = [];
  let prev = null;
  for (const line of lines) {
    if (line !== prev) out.push(line);
    prev = line;
  }
  return out;
}

function processFile(file, write) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');
  const clean = dedupeLines(lines);
  if (clean.length !== lines.length) {
    if (write) writeFileSync(file, clean.join('\n'), 'utf8');
    console.log((write ? 'deduped' : 'duplicates in') + ' ' + file);
    return 1;
  }
  return 0;
}

function walk(dir, write) {
  let count = 0;
  for (const entry of readdirSync(dir)) {
    if (entry === '.git') continue;
    const full = join(dir, entry);
    const info = statSync(full);
    if (info.isDirectory()) {
      count += walk(full, write);
    } else if (/\.(?:js|mjs|html|md|json)$/u.test(entry)) {
      count += processFile(full, write);
    }
  }
  return count;
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const write = !process.argv.includes('--check');
  const total = walk(process.cwd(), write);
  if (total === 0) console.log('no duplicate lines found');
}

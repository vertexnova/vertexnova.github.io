#!/usr/bin/env node
/**
 * Compare the site catalog (src/data/samples.ts) against WASM HTML artifacts.
 *
 * Usage:
 *   tsx scripts/verify-wasm-catalog.mjs [wasmDir]
 *   tsx scripts/verify-wasm-catalog.mjs --strict [wasmDir]
 *   tsx scripts/verify-wasm-catalog.mjs --optional-file .github/wasm-optional-targets.txt
 *
 * Exit codes:
 *   0 — every required catalog target has an HTML file (full match)
 *   1 — zero catalog matches, or --strict with any required target missing
 *   2 — partial match (some missing); deploy may treat as warning only
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllSamples } from '../src/data/samples.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const opts = {
    strict: false,
    wasmDir: path.join(ROOT, 'public', 'wasm'),
    optionalFile: path.join(ROOT, '.github', 'wasm-optional-targets.txt'),
  };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--strict') {
      opts.strict = true;
    } else if (a === '--optional-file') {
      opts.optionalFile = path.resolve(argv[++i] || '');
    } else if (a.startsWith('-')) {
      console.error(`Unknown flag: ${a}`);
      process.exit(1);
    } else {
      positional.push(a);
    }
  }
  if (positional[0]) {
    opts.wasmDir = path.resolve(positional[0]);
  }
  return opts;
}

function readOptionalTargets(filePath) {
  if (!fs.existsSync(filePath)) return new Set();
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  const set = new Set();
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    set.add(trimmed);
  }
  return set;
}

function listSampleHtml(wasmDir) {
  if (!fs.existsSync(wasmDir)) return [];
  return fs
    .readdirSync(wasmDir)
    .filter((f) => /^\d\d_.+\.html$/.test(f))
    .map((f) => f.replace(/\.html$/, ''))
    .sort();
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const samples = getAllSamples();
  const optional = readOptionalTargets(opts.optionalFile);
  const onDisk = new Set(listSampleHtml(opts.wasmDir));
  const catalogTargets = new Set(samples.map((s) => s.target));

  const live = [];
  const missingRequired = [];
  const missingOptional = [];

  for (const s of samples) {
    if (onDisk.has(s.target)) {
      live.push(s);
      continue;
    }
    if (optional.has(s.target)) {
      missingOptional.push(s);
    } else {
      missingRequired.push(s);
    }
  }

  const orphans = [...onDisk].filter((t) => !catalogTargets.has(t)).sort();

  const total = samples.length;
  const liveCount = live.length;
  const requiredMissingCount = missingRequired.length;

  console.log(`WASM catalog verify · dir=${path.relative(ROOT, opts.wasmDir) || '.'}`);
  console.log(`live ${liveCount}/${total}`);
  if (optional.size) {
    console.log(`optional allowlist: ${[...optional].sort().join(', ')}`);
  }
  if (missingOptional.length) {
    console.log(`missing (optional, allowed):`);
    for (const s of missingOptional) {
      console.log(`  - ${s.target} (${s.title})`);
    }
  }
  if (missingRequired.length) {
    console.log(`missing (required):`);
    for (const s of missingRequired) {
      console.log(`  - ${s.target} (${s.title})`);
    }
  }
  if (orphans.length) {
    console.log(`orphan HTML (on disk, not in catalog):`);
    for (const t of orphans) {
      console.log(`  - ${t}`);
    }
  }
  if (!missingRequired.length && !orphans.length && !missingOptional.length) {
    console.log('OK: catalog and WASM HTML are fully aligned.');
  }

  // GitHub Actions step summary (best-effort)
  const summary = process.env.GITHUB_STEP_SUMMARY;
  if (summary) {
    const lines = [
      `### WASM catalog verify`,
      `- Dir: \`${path.relative(ROOT, opts.wasmDir) || '.'}\``,
      `- Live: **${liveCount}/${total}**`,
      `- Mode: ${opts.strict ? 'strict' : 'warn-on-partial'}`,
    ];
    if (missingRequired.length) {
      lines.push('', 'Missing (required):', ...missingRequired.map((s) => `- \`${s.target}\``));
    }
    if (missingOptional.length) {
      lines.push('', 'Missing (optional):', ...missingOptional.map((s) => `- \`${s.target}\``));
    }
    if (orphans.length) {
      lines.push('', 'Orphans:', ...orphans.map((t) => `- \`${t}\``));
    }
    fs.appendFileSync(summary, lines.join('\n') + '\n');
  }

  if (liveCount === 0) {
    console.error('error: zero catalog samples have WASM HTML — site would show no live demos.');
    process.exit(1);
  }

  if (requiredMissingCount === 0) {
    process.exit(0);
  }

  if (opts.strict) {
    console.error(
      `error: strict mode — ${requiredMissingCount} required catalog target(s) missing HTML.`
    );
    process.exit(1);
  }

  console.warn(
    `warn: partial match — ${requiredMissingCount} required catalog target(s) missing HTML (exit 2).`
  );
  process.exit(2);
}

main();

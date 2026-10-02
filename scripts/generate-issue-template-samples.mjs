#!/usr/bin/env node
/**
 * Regenerate the Sample name dropdown in
 * .github/ISSUE_TEMPLATE/webgpu-sample-bug.yml from src/data/samples.ts.
 *
 * Usage: tsx scripts/generate-issue-template-samples.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllSamples } from '../src/data/samples.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATE = path.join(ROOT, '.github', 'ISSUE_TEMPLATE', 'webgpu-sample-bug.yml');

const samples = getAllSamples();
const options = [
  ...samples.map((s) => `        - ${s.title} (${s.target})`),
  '        - Multiple samples',
  '        - All samples',
].join('\n');

let yaml = fs.readFileSync(TEMPLATE, 'utf8');

const re =
  /(id:\s*sample\s*\n\s*attributes:\s*\n\s*label:\s*Sample name\s*\n\s*description:[^\n]*\n\s*options:\n)([\s\S]*?)(\n\s*validations:)/;

if (!re.test(yaml)) {
  console.error('error: could not locate Sample name options block in', TEMPLATE);
  process.exit(1);
}

yaml = yaml.replace(re, `$1${options}$3`);
fs.writeFileSync(TEMPLATE, yaml);
console.log(`Updated ${path.relative(ROOT, TEMPLATE)} · ${samples.length} samples + Multiple/All`);

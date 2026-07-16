#!/usr/bin/env node
/**
 * Inject /coi-serviceworker.js into every public/wasm/*.html sample page.
 * GitHub Pages cannot set COOP/COEP headers; the SW adds them at runtime so
 * SharedArrayBuffer / WebGPU samples can run (standalone and in the iframe).
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const DIR = process.argv[2] || "public/wasm";
const SNIPPET = '<script src="/coi-serviceworker.js"></script>';

const files = (await readdir(DIR)).filter((f) => f.endsWith(".html"));
let patched = 0;

for (const name of files) {
  const path = join(DIR, name);
  let html = await readFile(path, "utf8");
  if (html.includes("coi-serviceworker")) continue;

  if (html.includes("<head>")) {
    html = html.replace("<head>", `<head>${SNIPPET}`);
  } else if (/<head\s[^>]*>/i.test(html)) {
    html = html.replace(/<head\s[^>]*>/i, (m) => `${m}${SNIPPET}`);
  } else {
    html = SNIPPET + html;
  }

  await writeFile(path, html);
  patched++;
}

console.log(`inject-coi: patched ${patched}/${files.length} HTML files in ${DIR}`);

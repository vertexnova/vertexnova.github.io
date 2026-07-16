#!/usr/bin/env node
/**
 * Prepare public/wasm/*.html for GitHub Pages:
 *  1. Inject /coi-serviceworker.js (Pages cannot set COOP/COEP headers)
 *  2. Replace Emscripten's instant crossOriginIsolated hard-fail with a
 *     deferred check so the service worker can reload/isolate first.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const DIR = process.argv[2] || "public/wasm";
const SNIPPET = '<script src="/coi-serviceworker.js"></script>';
const CENTER_STYLE =
  '<style id="vne-embed-center">html,body{height:100%}body{justify-content:center!important;min-height:100%!important;box-sizing:border-box}</style>';

/** Emscripten emits this exact check; replace with a SW-friendly version. */
const OLD_CHECK_RE =
  /crossOriginIsolated\|\|window\.addEventListener\("DOMContentLoaded",\(\(\)=>\{showError\("This page requires cross-origin isolation \(COOP \+ COEP headers\)\. Serve via scripts\/build_wasm\.sh --serve, or configure your server to send:\\nCross-Origin-Opener-Policy: same-origin\\nCross-Origin-Embedder-Policy: require-corp"\)\}\)\)/;

// Waits for COI (parent inheritance in iframe, or SW reload at top-level).
const NEW_CHECK =
  '(function(){function fail(){showError("This page requires cross-origin isolation (COOP + COEP headers). Serve via scripts/build_wasm.sh --serve, or configure your server to send:\\nCross-Origin-Opener-Policy: same-origin\\nCross-Origin-Embedder-Policy: require-corp")}if(window.crossOriginIsolated)return;var n=0;var t=setInterval(function(){if(window.crossOriginIsolated){clearInterval(t);return}if(++n>=60){clearInterval(t);fail()}},100)})();';

const files = (await readdir(DIR)).filter((f) => f.endsWith(".html"));
let injected = 0;
let checks = 0;
let centered = 0;

for (const name of files) {
  const path = join(DIR, name);
  let html = await readFile(path, "utf8");
  let changed = false;

  if (!html.includes("coi-serviceworker")) {
    if (html.includes("<head>")) {
      html = html.replace("<head>", `<head>${SNIPPET}`);
    } else if (/<head\s[^>]*>/i.test(html)) {
      html = html.replace(/<head\s[^>]*>/i, (m) => `${m}${SNIPPET}`);
    } else {
      html = SNIPPET + html;
    }
    injected++;
    changed = true;
  }

  if (!html.includes("vne-embed-center")) {
    if (html.includes("<head>")) {
      html = html.replace("<head>", `<head>${CENTER_STYLE}`);
    } else if (/<head\s[^>]*>/i.test(html)) {
      html = html.replace(/<head\s[^>]*>/i, (m) => `${m}${CENTER_STYLE}`);
    } else {
      html = CENTER_STYLE + html;
    }
    centered++;
    changed = true;
  }

  if (OLD_CHECK_RE.test(html)) {
    html = html.replace(OLD_CHECK_RE, NEW_CHECK);
    checks++;
    changed = true;
  }

  if (changed) await writeFile(path, html);
}

console.log(
  `inject-coi: ${files.length} HTML in ${DIR} · SW ${injected} · center ${centered} · COI check ${checks}`
);

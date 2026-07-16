#!/usr/bin/env node
/**
 * Prepare public/wasm/*.html for GitHub Pages:
 *  1. Inject /coi-serviceworker.js (Pages cannot set COOP/COEP headers)
 *  2. Center the sample UI in the viewport (embedded iframe + standalone)
 *  3. Replace Emscripten's instant crossOriginIsolated hard-fail with a
 *     deferred check so the service worker can reload/isolate first.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const DIR = process.argv[2] || "public/wasm";
const SNIPPET = '<script src="/coi-serviceworker.js"></script>';
const CENTER_STYLE =
  '<style id="vne-embed-center">' +
  "html,body{height:100%;margin:0}" +
  "body{" +
  "display:flex!important;" +
  "flex-direction:column!important;" +
  "align-items:center!important;" +
  "justify-content:center!important;" +
  "min-height:100%!important;" +
  "padding:16px!important;" +
  "box-sizing:border-box!important;" +
  "overflow:auto!important" +
  "}" +
  "#titlebar,#statusbar,#canvas-wrap{flex-shrink:0}" +
  "</style>";

/** Emscripten emits this exact check; replace with a SW-friendly version. */
const OLD_CHECK_RE =
  /crossOriginIsolated\|\|window\.addEventListener\("DOMContentLoaded",\(\(\)=>\{showError\("This page requires cross-origin isolation \(COOP \+ COEP headers\)\. Serve via scripts\/build_wasm\.sh --serve, or configure your server to send:\\nCross-Origin-Opener-Policy: same-origin\\nCross-Origin-Embedder-Policy: require-corp"\)\}\)\)/;

// Waits for COI (parent inheritance in iframe, or SW reload at top-level).
const NEW_CHECK =
  '(function(){function fail(){showError("This page requires cross-origin isolation (COOP + COEP headers). Serve via scripts/build_wasm.sh --serve, or configure your server to send:\\nCross-Origin-Opener-Policy: same-origin\\nCross-Origin-Embedder-Policy: require-corp")}if(window.crossOriginIsolated)return;var n=0;var t=setInterval(function(){if(window.crossOriginIsolated){clearInterval(t);return}if(++n>=60){clearInterval(t);fail()}},100)})();';

const CENTER_RE = /<style id="vne-embed-center">[\s\S]*?<\/style>/;

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

  if (CENTER_RE.test(html)) {
    const next = html.replace(CENTER_RE, CENTER_STYLE);
    if (next !== html) {
      html = next;
      centered++;
      changed = true;
    }
  } else if (html.includes("</head>")) {
    // Append last in <head> so it wins over the Emscripten shell stylesheet.
    html = html.replace("</head>", `${CENTER_STYLE}</head>`);
    centered++;
    changed = true;
  } else if (html.includes("<head>")) {
    html = html.replace("<head>", `<head>${CENTER_STYLE}`);
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

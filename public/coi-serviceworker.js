/**
 * coi-serviceworker — Cross-Origin Isolation service worker
 *
 * Adds Cross-Origin-Opener-Policy: same-origin and
 * Cross-Origin-Embedder-Policy: require-corp headers to every response so
 * that SharedArrayBuffer (required by Emscripten pthreads / WebGPU samples)
 * is available on GitHub Pages, which cannot set custom HTTP headers.
 *
 * The same file acts as:
 *  • A registration script when loaded in a <script> tag (window context).
 *  • The service worker itself when installed by the browser (SW context).
 *
 * Based on https://github.com/gzuidhof/coi-serviceworker (MIT).
 */
"use strict";

/* ── Service-worker context ────────────────────────────────────────────── */
if (typeof window === "undefined") {
  self.addEventListener("install", () => self.skipWaiting());

  self.addEventListener("activate", (event) =>
    event.waitUntil(self.clients.claim())
  );

  self.addEventListener("fetch", (event) => {
    const { request } = event;

    // Skip opaque no-cors requests to cross-origin resources.
    if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
      return;
    }

    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 0) return response;

          const headers = new Headers(response.headers);
          headers.set("Cross-Origin-Opener-Policy", "same-origin");
          headers.set("Cross-Origin-Embedder-Policy", "require-corp");
          headers.set("Cross-Origin-Resource-Policy", "cross-origin");

          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
          });
        })
        .catch(() => fetch(request))
    );
  });
} else {
  /* ── Browser / registration context ─────────────────────────────────── */
  (async () => {
    // Already isolated — nothing to do.
    if (window.crossOriginIsolated !== false) return;

    if (!("serviceWorker" in navigator)) {
      console.warn(
        "[coi-serviceworker] Service workers not supported. " +
          "WebGPU samples that use SharedArrayBuffer may not work."
      );
      return;
    }

    const scriptSrc =
      document.currentScript?.src ?? "/coi-serviceworker.js";

    try {
      const reg = await navigator.serviceWorker.register(scriptSrc);

      const sw = reg.installing ?? reg.waiting;
      if (sw) {
        sw.addEventListener("statechange", ({ target }) => {
          if (target.state === "activated") window.location.reload();
        });
      } else if (reg.active) {
        // SW already active but page was served without headers — reload.
        window.location.reload();
      }
    } catch (err) {
      console.warn("[coi-serviceworker] Registration failed:", err);
    }
  })();
}

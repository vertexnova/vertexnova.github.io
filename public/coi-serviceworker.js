/*! coi-serviceworker v0.1.7 - Guido Zuidhof and contributors, licensed under MIT */
/*! Adapted for VertexNova GitHub Pages (WebGPU / SharedArrayBuffer). */
let coepCredentialless = false;
if (typeof window === "undefined") {
  self.addEventListener("install", () => self.skipWaiting());
  self.addEventListener("activate", (event) =>
    event.waitUntil(self.clients.claim())
  );

  self.addEventListener("message", (ev) => {
    if (!ev.data) {
      return;
    } else if (ev.data.type === "deregister") {
      self.registration
        .unregister()
        .then(() => self.clients.matchAll())
        .then((clients) => {
          clients.forEach((client) => client.navigate(client.url));
        });
    } else if (ev.data.type === "coepCredentialless") {
      coepCredentialless = ev.data.value;
    }
  });

  self.addEventListener("fetch", function (event) {
    const r = event.request;
    if (r.cache === "only-if-cached" && r.mode !== "same-origin") {
      return;
    }

    const request =
      coepCredentialless && r.mode === "no-cors"
        ? new Request(r, { credentials: "omit" })
        : r;

    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 0) {
            return response;
          }

          const newHeaders = new Headers(response.headers);
          newHeaders.set(
            "Cross-Origin-Embedder-Policy",
            coepCredentialless ? "credentialless" : "require-corp"
          );
          if (!coepCredentialless) {
            newHeaders.set("Cross-Origin-Resource-Policy", "cross-origin");
          }
          newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
          });
        })
        .catch((e) => console.error(e))
    );
  });
} else {
  (() => {
    // Sample iframes share sessionStorage with the top page. Never let an
    // embedded shell register, mutate COI flags, or reload itself.
    if (window.top !== window) {
      return;
    }

    const reloadedBySelf = window.sessionStorage.getItem("coiReloadedBySelf");
    window.sessionStorage.removeItem("coiReloadedBySelf");
    const coepDegrading = reloadedBySelf == "coepdegrade";

    const coi = {
      shouldRegister: () => !reloadedBySelf,
      shouldDeregister: () => false,
      coepCredentialless: () => true,
      coepDegrade: () => true,
      doReload: () => window.location.reload(),
      quiet: false,
      ...window.coi,
    };

    const n = navigator;
    const controlling = n.serviceWorker && n.serviceWorker.controller;

    // Once isolation succeeds, forget a prior COEP failure so a single bad
    // visit does not stick for the rest of the session.
    if (window.crossOriginIsolated) {
      window.sessionStorage.removeItem("coiCoepHasFailed");
      window.sessionStorage.removeItem("coiReloadAttempts");
      return;
    }

    if (controlling && !window.crossOriginIsolated) {
      window.sessionStorage.setItem("coiCoepHasFailed", "true");
    }
    const coepHasFailed = window.sessionStorage.getItem("coiCoepHasFailed");

    function reloadOnce(reason) {
      const attempts = Number(window.sessionStorage.getItem("coiReloadAttempts") || "0");
      if (attempts >= 2) {
        !coi.quiet &&
          console.warn(
            "COOP/COEP Service Worker: giving up after reload attempts. Allow service workers, then refresh."
          );
        return false;
      }
      window.sessionStorage.setItem("coiReloadAttempts", String(attempts + 1));
      window.sessionStorage.setItem("coiReloadedBySelf", reason);
      !coi.quiet && console.log("Reloading page for COOP/COEP (" + reason + ").");
      coi.doReload(reason);
      return true;
    }

    if (controlling) {
      const reloadToDegrade =
        coi.coepDegrade() && !(coepDegrading || window.crossOriginIsolated);
      n.serviceWorker.controller.postMessage({
        type: "coepCredentialless",
        value:
          reloadToDegrade || (coepHasFailed && coi.coepDegrade())
            ? false
            : coi.coepCredentialless(),
      });
      if (reloadToDegrade) {
        reloadOnce("coepdegrade");
        return;
      }

      if (coi.shouldDeregister()) {
        n.serviceWorker.controller.postMessage({ type: "deregister" });
      }
    }

    if (window.crossOriginIsolated !== false || !coi.shouldRegister()) return;

    if (!window.isSecureContext) {
      !coi.quiet &&
        console.log(
          "COOP/COEP Service Worker not registered, a secure context is required."
        );
      return;
    }

    if (!n.serviceWorker) {
      !coi.quiet &&
        console.error(
          "COOP/COEP Service Worker not registered, perhaps due to private mode."
        );
      return;
    }

    // Reload when the SW takes control after registration — covers the race
    // where updatefound fires before a listener is attached.
    let reloading = false;
    n.serviceWorker.addEventListener("controllerchange", () => {
      if (reloading) return;
      reloading = true;
      reloadOnce("controllerchange");
    });

    const scriptUrl = window.document.currentScript
      ? window.document.currentScript.src
      : "/coi-serviceworker.js";

    n.serviceWorker.register(scriptUrl).then(
      (registration) => {
        !coi.quiet &&
          console.log(
            "COOP/COEP Service Worker registered",
            registration.scope
          );

        registration.addEventListener("updatefound", () => {
          reloadOnce("updatefound");
        });

        // Wait until the SW is ready. If it still is not controlling this
        // client (or isolation is still false), reload once so the next
        // document load is under COOP/COEP.
        Promise.resolve(n.serviceWorker.ready)
          .then(() => {
            if (window.crossOriginIsolated) return;
            if (!n.serviceWorker.controller) {
              reloadOnce("notcontrolling");
              return;
            }
            // Controlled but not isolated yet — headers may need a fresh load.
            if (!reloadedBySelf) {
              reloadOnce("needisolation");
            }
          })
          .catch((err) => {
            !coi.quiet &&
              console.error("COOP/COEP Service Worker ready failed:", err);
          });
      },
      (err) => {
        !coi.quiet &&
          console.error("COOP/COEP Service Worker failed to register:", err);
      }
    );
  })();
}

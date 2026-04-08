---
"emdash": minor
---

Adds `siteUrl` config option to fix reverse-proxy origin mismatch. Replaces `passkeyPublicOrigin` with a single setting that covers all origin-dependent features: passkeys, CSRF, OAuth, auth redirects, MCP discovery, snapshots, sitemap, robots.txt, and JSON-LD.

Supports `EMDASH_SITE_URL` / `SITE_URL` environment variables for container deployments where the domain is only known at runtime.

Sets Astro's `security.allowedDomains` so the Node adapter trusts `X-Forwarded-*` proxy headers, fixing Astro's built-in origin check behind reverse proxies.

**Breaking:** `passkeyPublicOrigin` is removed. Rename to `siteUrl` in your `astro.config.mjs`.

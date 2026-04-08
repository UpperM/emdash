import { describe, it, expect } from "vitest";

import { getPublicOrigin, getPublicUrl } from "../../../src/api/public-url.js";
import type { EmDashConfig } from "../../../src/astro/integration/runtime.js";

describe("getPublicOrigin()", () => {
	it("returns config.siteUrl when set", () => {
		const url = new URL("http://localhost:4321/admin");
		const config: EmDashConfig = { siteUrl: "https://mysite.example.com" };
		expect(getPublicOrigin(url, config)).toBe("https://mysite.example.com");
	});

	it("returns url.origin when config has no siteUrl", () => {
		const url = new URL("http://localhost:4321/admin");
		const config: EmDashConfig = {};
		expect(getPublicOrigin(url, config)).toBe("http://localhost:4321");
	});

	it("returns url.origin when config is undefined", () => {
		const url = new URL("https://example.com:8443/setup");
		expect(getPublicOrigin(url)).toBe("https://example.com:8443");
	});

	it("returns url.origin when config.siteUrl is undefined", () => {
		const url = new URL("http://127.0.0.1:4321/api");
		expect(getPublicOrigin(url, { siteUrl: undefined })).toBe("http://127.0.0.1:4321");
	});

	it("does not return empty string siteUrl (falsy)", () => {
		const url = new URL("http://localhost:4321/x");
		// Empty string should fall through to url.origin
		expect(getPublicOrigin(url, { siteUrl: "" })).toBe("http://localhost:4321");
	});
});

describe("getPublicUrl()", () => {
	it("builds full URL from siteUrl + path", () => {
		const url = new URL("http://localhost:4321/x");
		const config: EmDashConfig = { siteUrl: "https://mysite.example.com" };
		expect(getPublicUrl(url, config, "/_emdash/admin/login")).toBe(
			"https://mysite.example.com/_emdash/admin/login",
		);
	});

	it("builds full URL from request origin when no siteUrl", () => {
		const url = new URL("http://localhost:4321/x");
		expect(getPublicUrl(url, undefined, "/_emdash/admin/login")).toBe(
			"http://localhost:4321/_emdash/admin/login",
		);
	});
});

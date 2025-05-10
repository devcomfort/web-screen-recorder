import { toMIMETypeString } from "./to-mime-type-string";
import type { MIMEType } from "./types";
import { describe, it, expect } from "vitest";

describe("toMIMETypeString", () => {
	it("should return the correct MIME type string with parameters", () => {
		const mimeType: MIMEType = {
			type: "text",
			subtype: "html",
			parameters: { charset: "utf-8" },
		};
		expect(toMIMETypeString(mimeType)).toBe("text/html; charset=utf-8");
	});

	it("should return the correct MIME type string without parameters", () => {
		const mimeType: MIMEType = {
			type: "video",
			subtype: "mp4",
			parameters: {},
		};
		expect(toMIMETypeString(mimeType)).toBe("video/mp4");
	});

	it("should handle empty parameters correctly", () => {
		const mimeType: MIMEType = {
			type: "application",
			subtype: "json",
			parameters: {},
		};
		expect(toMIMETypeString(mimeType)).toBe("application/json");
	});

	it("should handle multiple parameters correctly", () => {
		const mimeType: MIMEType = {
			type: "image",
			subtype: "jpeg",
			parameters: { quality: "0.8", progressive: "true" },
		};
		expect(toMIMETypeString(mimeType)).toBe(
			"image/jpeg; quality=0.8; progressive=true",
		);
	});

	it("should handle parameters with special characters correctly", () => {
		const mimeType: MIMEType = {
			type: "application",
			subtype: "x-www-form-urlencoded",
			parameters: { "content-type": "application/json" },
		};
		expect(toMIMETypeString(mimeType)).toBe(
			"application/x-www-form-urlencoded; content-type=application/json",
		);
	});

	it("should handle parameters with spaces correctly", () => {
		const mimeType: MIMEType = {
			type: "text",
			subtype: "plain",
			parameters: { "content-type": "text/plain; charset=utf-8" },
		};
		expect(toMIMETypeString(mimeType)).toBe(
			"text/plain; content-type=text/plain; charset=utf-8",
		);
	});
});

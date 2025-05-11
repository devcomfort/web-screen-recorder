import { MIMEType } from "./mime-type";
import type { MIMEType as _MIMEType } from "../schemas/mime-type/types";
import { describe, it, expect } from "vitest";

describe("toMIMETypeString", () => {
	it("returns the correct MIME type string with parameters", () => {
		const mimeType: _MIMEType = {
			type: "text",
			subtype: "html",
			parameters: { charset: "utf-8" },
		};
		expect(MIMEType.toMIMETypeString(mimeType)).toBe(
			"text/html; charset=utf-8",
		);
	});

	it("returns the correct MIME type string without parameters", () => {
		const mimeType: _MIMEType = {
			type: "video",
			subtype: "mp4",
			parameters: {},
		};
		expect(MIMEType.toMIMETypeString(mimeType)).toBe("video/mp4");
	});

	it("handles empty parameters correctly", () => {
		const mimeType: _MIMEType = {
			type: "application",
			subtype: "json",
			parameters: {},
		};
		expect(MIMEType.toMIMETypeString(mimeType)).toBe("application/json");
	});

	it("handles multiple parameters correctly", () => {
		const mimeType: _MIMEType = {
			type: "image",
			subtype: "jpeg",
			parameters: { quality: "0.8", progressive: "true" },
		};
		expect(MIMEType.toMIMETypeString(mimeType)).toBe(
			"image/jpeg; quality=0.8; progressive=true",
		);
	});

	it("handles parameters with special characters correctly", () => {
		const mimeType: _MIMEType = {
			type: "application",
			subtype: "x-www-form-urlencoded",
			parameters: { "content-type": "application/json" },
		};
		expect(MIMEType.toMIMETypeString(mimeType)).toBe(
			"application/x-www-form-urlencoded; content-type=application/json",
		);
	});

	it("handles parameters with spaces correctly", () => {
		const mimeType: _MIMEType = {
			type: "text",
			subtype: "plain",
			parameters: { "content-type": "text/plain; charset=utf-8" },
		};
		expect(MIMEType.toMIMETypeString(mimeType)).toBe(
			"text/plain; content-type=text/plain; charset=utf-8",
		);
	});
});

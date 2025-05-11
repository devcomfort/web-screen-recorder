import { MediaFormat } from "./media-format";
import type { MediaFormat as _MediaFormat, MIMEType } from "../schemas";

import { describe, it, expect } from "vitest";

describe("toMIMEType", () => {
	it("should return the correct MIME type for video with a codec", () => {
		const mediaFormat: _MediaFormat = {
			mediaType: "video",
			codec: "vp9",
			fileFormat: "webm",
		};
		const expectedMimeType: MIMEType = {
			type: "video",
			subtype: "webm",
			parameters: { codecs: "vp9" },
		};
		expect(MediaFormat.toMIMEType(mediaFormat)).toEqual(expectedMimeType);
	});

	it("should return the correct MIME type for audio with a codec", () => {
		const mediaFormat: _MediaFormat = {
			mediaType: "audio",
			codec: "opus",
			fileFormat: "webm",
		};
		const expectedMimeType: MIMEType = {
			type: "audio",
			subtype: "webm",
			parameters: { codecs: "opus" },
		};
		expect(MediaFormat.toMIMEType(mediaFormat)).toEqual(expectedMimeType);
	});
});

describe("isSupportedFormat", () => {
	it("should return true for a supported video format", () => {
		const mediaFormat: _MediaFormat = {
			mediaType: "video",
			codec: "vp9",
			fileFormat: "webm",
		};
		expect(MediaFormat.isSupportedFormat(mediaFormat)).toBe(true);
	});

	it("should return true for a supported audio format", () => {
		const mediaFormat: _MediaFormat = {
			mediaType: "audio",
			codec: "opus",
			fileFormat: "webm",
		};
		expect(MediaFormat.isSupportedFormat(mediaFormat)).toBe(true);
	});

	it("should return false for an unsupported video format", () => {
		const mediaFormat: _MediaFormat = {
			mediaType: "video",
			// @ts-expect-error - 테스트 코드에서 타입 오류를 확인하기 위해 사용
			codec: "fake-codec" as const,
			fileFormat: "webm",
		};
		expect(MediaFormat.isSupportedFormat(mediaFormat)).toBe(false);
	});

	it("should return false for an unsupported audio format", () => {
		const mediaFormat: _MediaFormat = {
			mediaType: "audio",
			// @ts-expect-error - 테스트 코드에서 타입 오류를 확인하기 위해 사용
			codec: "fake-codec" as const,
			fileFormat: "webm",
		};
		expect(MediaFormat.isSupportedFormat(mediaFormat)).toBe(false);
	});
});

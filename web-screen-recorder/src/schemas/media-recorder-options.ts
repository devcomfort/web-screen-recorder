import { z } from "zod";

/** 브라우저에 존재하는 미디어 레코더 옵션 스키마 */
export const MediaRecorderOptions_ = z
	.object({
		audioBitsPerSecond: z.number(),
		bitsPerSecond: z.number(),
		mimeType: z.string(),
		videoBitsPerSecond: z.number(),
		fps: z.number().int().gt(0).describe("영상 녹화 시 프레임"),
	})
	.partial();

// NOTE: MediaRecorderOptions 타입은 기존에 브라우저에 존재하는 타입임.

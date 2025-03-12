import { z } from "zod";

/** 미디어 형식 지원 정보 */
export const MediaFormatSupport_ = z.object({
	supported: z.boolean(),
	mimeType: z.string(),
});

/** 미디어 형식 지원 정보 */
export type MediaFormatSupport = z.infer<typeof MediaFormatSupport_>;

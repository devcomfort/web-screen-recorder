import { z } from "zod";
import { MediaType_ } from "./media-type";

/** 미디어 포맷 정의 */
export const MediaFormat_ = z.object({
	mediaType: MediaType_,
	codec: z.string(),
	container: z.string(),
	mimeType: z.string(),
});

/** 미디어 포맷 정의 */
export type MediaFormat = z.infer<typeof MediaFormat_>;

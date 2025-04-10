import { z } from "zod";
import { MediaTypeSchema } from "./media-type";
import { MIMETypeSchema } from "./mime-type";

/** 비디오 스키마 정의 */
export const VideoTypeSchema = z.object({
	mediaType: MediaTypeSchema,
	mimeType: MIMETypeSchema,
});

/** 비디오 타입 정의 */
export type VideoType = z.infer<typeof VideoTypeSchema>;

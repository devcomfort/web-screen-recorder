import { z } from "zod";
import { MediaType_ } from "../media-type/media-type";
import { MIMEType_ } from "../mime-type/mime-type";

/** 비디오 스키마 정의 */
export const VideoType_ = z.object({
	mediaType: MediaType_.describe("비디오 타입"),
	mimeType: MIMEType_.describe("비디오 타입의 MIME 타입"),
});

/** 비디오 타입 정의 */
export type VideoType = z.infer<typeof VideoType_>;

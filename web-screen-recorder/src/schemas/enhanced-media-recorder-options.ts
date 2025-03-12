import { z } from "zod";
import { MediaRecorderOptions_ } from "./media-recorder-options";
import { MediaType_ } from "./media-type";

/** 미디어 레코더 옵션 스키마 */
export const EnhancedMediaRecorderOptions_ = MediaRecorderOptions_.extend({
	mediaType: MediaType_,
	codec: z.string(),
	container: z.string(),
}).partial();

/** 미디어 레코더 옵션 인터페이스 */
export type EnhancedMediaRecorderOptions = z.infer<
	typeof EnhancedMediaRecorderOptions_
>;

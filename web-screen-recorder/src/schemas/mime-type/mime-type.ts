import { z } from "zod";
import { MediaType_ } from "../media-type/media-type";

/** MIME 타입 정의 */
export const MIMEType_ = z.object({
	mediaType: MediaType_.describe("미디어 타입. 어떤 미디어에 대한 MIME 타입인지 정의함. (예시: video, audio)"),
	codec: z.string().describe("코덱 정보. (예시: h264, h265, etc.)"),
	container: z.string().describe("컨테이너 정보. (예시: webm, mp4, avi, etc.)"),
	mimeType: z.string().describe("MIME 타입. (예시: video/webm, video/mp4, audio/webm, audio/mp3, etc.)"),
});

/** MIME 타입 정의 */
export type MIMEType = z.infer<typeof MIMEType_>;

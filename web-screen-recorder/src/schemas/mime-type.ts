import { z } from "zod";
import { MediaTypeSchema } from "./media-type";

/** MIME 타입 정의 */
export const MIMETypeSchema = z.object({
	mediaType: MediaTypeSchema,
	codec: z.string().describe("코덱 정보. (예시: h264, h265, etc.)"),
	container: z.string().describe("컨테이너 정보. (예시: webm, mp4, avi, etc.)"),
	mimeType: z
		.string()
		.describe(
			"MIME 타입. (예시: video/webm, video/mp4, audio/webm, audio/mp3, etc.)",
		),
});

/** MIME 타입 정의 */
export type MIMEType = z.infer<typeof MIMETypeSchema>;

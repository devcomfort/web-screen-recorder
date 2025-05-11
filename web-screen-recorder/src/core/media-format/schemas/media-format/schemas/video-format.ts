import { VideoCodecSchema } from "../../codecs/schemas";
import { VideoFileFormatSchema } from "../../file-format/schemas";
import { z } from "zod";

/**
 * `VideoFormatSchema`는 비디오 파일 형식을 정의하는 Zod 스키마입니다.
 * 이 스키마는 `mediaType`, `codec`, `fileFormat` 속성을 포함하며, 각 속성은 다음과 같습니다:
 * - `mediaType`: "video"로 고정된 문자열입니다. 이 값은 비디오 파일임을 나타냅니다.
 * - `codec`: 비디오 코덱을 나타내는 `VideoCodecSchema`입니다. 코덱은 비디오 데이터를 인코딩/디코딩하는 방식을 정의합니다.
 * - `fileFormat`: 비디오 파일 형식을 나타내는 `VideoFileFormatSchema`입니다. 파일 형식은 비디오 데이터를 저장하는 컨테이너를 정의합니다.
 *
 * 이 스키마는 `VideoFormat` 타입을 생성하는 데 사용되며, `validateVideoFormat` 함수를 통해 값의 유효성을 검증할 수 있습니다.
 */
export const VideoFormatSchema = z.object({
	mediaType: z.literal("video"),
	codec: VideoCodecSchema,
	fileFormat: VideoFileFormatSchema,
});
